pipeline{
    agent any   

    environment {
        //REPOSITORY_CREDENTIAL_ID = 'gitlab-jenkins-key'
        REPOSITORY_URL = 'https://github.com/FISA-on-Top/frontend.git'

        AWS_CREDENTIAL_NAME = 'ECR-access'
        ECR_NAME = 'AWS'
        ECR_PATH = '038331013212.dkr.ecr.ap-northeast-2.amazonaws.com'
        
        IMAGE_NAME = 'web'
        IMAGE_VERSION = "0.${BUILD_NUMBER}"
        REGION = 'ap-northeast-2'        
    }
    stages {  

        stage('init for Prod server') {
            when{
                branch 'main'
            }
            steps {
                echo 'init stage'
                deleteDir()
            }
            post {
                success {
                    echo 'success init in pipeline'
                }
                failure {
                    error 'fail init in pipeline'
                }
            }
        }

        stage('Build Docker Image for Prod server'){
            when{
                branch 'main'
            }
            environment {
                IMAGE_NAME = 'front'
            }
            steps{
                // 1. 디렉토리 생성
                sh 'mkdir -p my_directory'

                echo 'Clone'
                dir('my_directory/Nginx') {
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: 'main']],
                        userRemoteConfigs: [[url: NGINX_URL]]
                    ])
                }
                
                dir('my_directory/frontend') {
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: 'main']],
                        userRemoteConfigs: [[url: WEB_URL]]
                    ])
                }

                // 3. 'Nginx'에 있는 dockerfile을 생성된 디렉토리 하위로 복사
                echo 'Copy dockerfile'
                sh 'cp my_directory/frontend/Dockerfile_Production my_directory/'
                
                // 4. 복사된 dockerfile을 이미지로 빌드
                echo 'Build'
                dir('my_directory') {
                    script{
                        sh '''
                        # docker build -f Dockerfile_Production --no-cache -t ${IMAGE_NAME}:${IMAGE_VERSION} .
                        docker build -f Dockerfile_Production --no-cache -t ${IMAGE_NAME}:latest .

                        # docker tag $IMAGE_NAME:$IMAGE_VERSION $ECR_PATH/$IMAGE_NAME:$IMAGE_VERSION
                        docker tag $IMAGE_NAME:latest $ECR_PATH/$IMAGE_NAME:latest
                        '''
                    }
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

        stage('Push to ECR for Prod server') {
            when{
            //     anyOf {
            //         changeset "dockerfile"
            //         changeset "conf/*"
            //     }
                branch 'main'
            }
            environment {
                IMAGE_NAME = 'front'
            }
            steps {
                script {
                    // cleanup current user docker credentials
                    sh 'rm -f ~/.dockercfg ~/.docker/config.json || true'

                    docker.withRegistry("https://${ECR_PATH}", "ecr:${REGION}:${AWS_CREDENTIAL_NAME}") {
                      //docker.image("${IMAGE_NAME}:${IMAGE_VERSION}").push()
                      docker.image("${IMAGE_NAME}:latest").push()
                    }
                }
            }
            post {
                always{
                    // sh("docker rmi -f ${ECR_PATH}/${IMAGE_NAME}:${IMAGE_VERSION}")
                    sh("docker rmi -f ${ECR_PATH}/${IMAGE_NAME}:latest")
                    // sh("docker rmi -f ${IMAGE_NAME}:${IMAGE_VERSION}")
                    sh("docker rmi -f ${IMAGE_NAME}:latest")
                }
                success {
                    echo 'success upload image'
                }
                failure {
                    error 'fail upload image' // exit pipeline
                }
            }
        }

        stage('Build Docker Image for Dev server'){
            when{
            //     anyOf {
            //         changeset "dockerfile"
            //         changeset "conf/*"
            //     }
                branch 'develop'
            }
            environment {
                IMAGE_NAME = 'web'
            }              
            steps{
                script{
                    sh '''
                    docker build -t ${IMAGE_NAME}:${IMAGE_VERSION} .
                    docker build -t ${IMAGE_NAME}:latest .
                    docker tag $IMAGE_NAME:$IMAGE_VERSION $ECR_PATH/$IMAGE_NAME:$IMAGE_VERSION
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

        stage('Push to ECR for Dev server') {
            when{
            //     anyOf {
            //         changeset "dockerfile"
            //         changeset "conf/*"
            //     }
                branch 'develop'
            }
            environment {
                IMAGE_NAME = 'web'
            } 
            steps {
                script {
                    // cleanup current user docker credentials
                    sh 'rm -f ~/.dockercfg ~/.docker/config.json || true'

                    docker.withRegistry("https://${ECR_PATH}", "ecr:${REGION}:${AWS_CREDENTIAL_NAME}") {
                      docker.image("${IMAGE_NAME}:${IMAGE_VERSION}").push()
                      docker.image("${IMAGE_NAME}:latest").push()
                    }
                }
            }
            post {
                always {
                    sh("docker rmi -f ${ECR_PATH}/${IMAGE_NAME}:${IMAGE_VERSION}")
                    sh("docker rmi -f ${ECR_PATH}/${IMAGE_NAME}:latest")
                    sh("docker rmi -f ${IMAGE_NAME}:${IMAGE_VERSION}")
                    sh("docker rmi -f ${IMAGE_NAME}:latest")
                }                
                success {
                    echo 'success upload image'
                }
                failure {
                    error 'fail upload image' // exit pipeline
                }
            }
        }
        stage('Pull and Delpoy to Devfront server'){
            when {
                branch 'develop'
                // anyOf {
                //     branch 'feature/*'
                //     branch 'develop'
                // }
            }
            environment{
                IMAGE_NAME = 'web'
                WEBSERVER_USERNAME = 'ubuntu'
                WEBSERVER_IP = '43.201.20.90' 
                CONTAINER_NAME = 'react-build18'

                FOLDER_NAME = 'frontend'
            }
            steps { 
                echo "Current branch is ${env.BRANCH_NAME}"

                sshagent(credentials: ['devfront']){
                    sh """  
                        ssh -o StrictHostKeyChecking=no $WEBSERVER_USERNAME@$WEBSERVER_IP '
                            ls

                            # Login to ECR and pull the Docker image
                            echo "login into aws"
                            aws ecr get-login-password --region $REGION | docker login --username $ECR_NAME --password-stdin $ECR_PATH
                            
                            # Pull image from ECR to web server
                            echo "pull the image from ECR "
                            docker pull $ECR_PATH/$IMAGE_NAME:latest

                            # Remove the existing folder, if it exists
                            echo " remove $FOLDER_NAME folder if it exists"
                            if ls ~/ | grep $FOLDER_NAME; then
                                rm -rf $FOLDER_NAME
                            fi

                            echo "clone git repo"
                            git clone -b $env.BRANCH_NAME https://github.com/FISA-on-Top/frontend.git frontend
                            cd frontend

                            # Run a new Docker container using the image from ECR
                            echo "docker run"
                            docker run --rm \
                            -v ~/nginx/build:/usr/src/app/build \
                            --name $CONTAINER_NAME $ECR_PATH/$IMAGE_NAME:latest
                        '
                    """                
                }
            }
            post{
                success {
                    echo 'success deploy to web server'
                }
                failure {
                    error 'fail deploy to web server' // exit pipeline
                }
            }
        
        }
    }
}