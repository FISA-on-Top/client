pipeline{
    agent any
    stages{
        stage('for deploy test in feature branch'){
            when{
                branch "feature*"
            }
            steps {
                echo 'this is just test '
            }
        }
    }
}