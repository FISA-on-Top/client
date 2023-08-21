pipeline{
    agent any   
    stages {
        stage('for deploy test in feature branch'){
            when{
                branch pattern: "feature/*"
            }
            // steps {
            //     // 여기에서는 'nginx' 레포지토리의 Jenkins 파이프라인을 실행합니다.
            //     script {
            //         build job: 'nginx-pipeline'
            //     }
            // }
            
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: '6418520a-09b4-481e-925e-88c36a2a88cc', keyFileVariable: 'SSH_KEY')]) {
                    sh """
                        ssh -o StrictHostKeyChecking=yes -i $SSH_KEY ubuntu@43.201.20.90 <<'ENDSSH' 
                        git clone -b feature/jenkins https://github.com/FISA-on-Top/frontend.git
                        cd frontend
                        docker build --no-cache -t nodejs-builder .
                        docker run --rm -d \
                        -p 3000:3000 \
                        -v ~/nginx/build:/usr/src/app/build \
                        --name react-build nodejs-builder
                       ENDSSH
                    """                
                }
            }
        
        }
    }
}