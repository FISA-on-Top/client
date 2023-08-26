pipeline{
    agent any   

    environment {
        REPOSITORY_URL = 'https://github.com/FISA-on-Top/frontend.git'
        TARGET_BRANCH = 'feature/#3'

        AWS_CREDENTIAL_NAME = 'ECR-access'
        ECR_PATH = '038331013212.dkr.ecr.ap-northeast-2.amazonaws.com'
        IMAGE_NAME = 'web'
        REGION = 'ap-northeast-2'        

        WEBSERVER_USERNAME = 'ubuntu'
        WEBSERVER_IP = '43.201.20.90' 
        CONTAINER_NAME = 'react-build18'

        FOLDER_NAME = 'frontend'
    }
    stages {        
        // stage('init') {
        //     steps {
        //         echo 'init stage'
        //         deleteDir()
        //     }
        //     post {
        //         success {
        //             echo 'success init in pipeline'
        //         }
        //         failure {
        //             error 'fail init in pipeline'
        //         }
        //     }
        // }  
        // stage('Checkout') {
        //     steps {
        //         checkout scm
        //         sh "ls -al"
        //     }
        //     post{
        //         success {
        //             echo 'success clone project'
        //         }
        //         failure {
        //             error 'fail clone project' // exit pipeline
        //         }     
        //     }
        // }
        // stage('Clone'){
        //     steps{
        //         git branch: "$env.BRANCH_NAME", 
        //         url: "$REPOSITORY_URL"
        //         sh "ls -al"
        //     }
        //     post{
        //         success {
        //             echo 'success clone project'
        //         }
        //         failure {
        //             error 'fail clone project' // exit pipeline
        //         }     
        //     }
        // }
        stage('Build Docker Image'){
            steps{
                script{
                    sh '''
                    docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .
                    docker build -t ${IMAGE_NAME}:latest .
                    docker tag $IMAGE_NAME:$BUILD_NUMBER $ECR_PATH/$IMAGE_NAME:$BUILD_NUMBER
                    docker tag $IMAGE_NAME:latest $ECR_PATH/$IMAGE_NAME:latest
                    '''
                }
            }
            post{
                success {
                    echo 'success dockerizing project'
                }
                failure {
                    error 'fail dockerizing project' // exit pipeline
                }
            }
        }
        stage('Push to ECR') {
            steps {
                script {
                    // cleanup current user docker credentials
                    sh 'rm -f ~/.dockercfg ~/.docker/config.json || true'

                    docker.withRegistry("https://${ECR_PATH}", "ecr:${REGION}:${AWS_CREDENTIAL_NAME}") {
                      docker.image("${IMAGE_NAME}:${BUILD_NUMBER}").push()
                      docker.image("${IMAGE_NAME}:latest").push()
                    }
                    
                    sh "docker rmi ${IMAGE_NAME}:${BUILD_NUMBER}"
                    sh "docker rmi ${IMAGE_NAME}:latest"
                }
            }
            post {
                success {
                    echo 'success upload image'
                }
                failure {
                    error 'fail upload image' // exit pipeline
                }
            }
        }
        stage('Pull and Delpoy'){
            when {
                anyOf {
                    branch 'feature/*'
                    branch 'develop'
                }
            }
            steps { 
                sshagent(credentials: ['devfront']){
                    sh """  
                        ssh -o StrictHostKeyChecking=yes $WEBSERVER_USERNAME@$WEBSERVER_IP '
                        ls

                        # Login to ECR and pull the Docker image
                        echo "login into aws"
                        aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ECR_PATH
                        
                        # Pull image from ECR to web server
                        echo "pull the image from ECR "
                        docker pull $ECR_PATH/$IMAGE_NAME:latest

                        # Remove the existing folder, if it exists
                        if ls ~/ | grep $FOLDER_NAME; then
                            rm -rf $FOLDER_NAME
                        fi

                        echo "clone git repo"
                        git clone -b $TARGET_BRANCH https://github.com/FISA-on-Top/frontend.git frontend
                        cd frontend

                        # Run a new Docker container using the image from ECR
                        echo "docker run"
                        docker run --rm -p 3000:3000 \
                        -v ~/nginx/build:/usr/src/app/build \
                        --name $CONTAINER_NAME $ECR_PATH/$IMAGE_NAME:latest
                        '
                    """                
                }
            }
        
        }
    }
}