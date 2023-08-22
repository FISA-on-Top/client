pipeline{
    agent any   
    environment {
        DEV_FRONT_SERVER_IP = '43.201.20.90' 
    }
    stages {
        stage('for deploy test in feature branch'){
            when{
                branch pattern: "feature/*"
            }
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: '6418520a-09b4-481e-925e-88c36a2a88cc', keyFileVariable: 'SSH_KEY')]) {
                    sh '''
                        ssh -o StrictHostKeyChecking=yes -i ${SSH_KEY} ubuntu@${DEV_FRONT_SERVER_IP} '
                        rm -rf frontend/ || true
                        git clone -b feature/jenkins https://github.com/FISA-on-Top/frontend.git frontend
                        cd frontend
                        docker rmi nodejs-builder18:latest || true
                        docker build --no-cache -t nodejs-builder18 .
                        docker run --rm -p 3000:3000 \
                        -v ~/nginx/build:/usr/src/app/build \
                        --name react-build18 nodejs-builder18:latest
                        '
                    '''               
                }
            }
        
        }
    }
}