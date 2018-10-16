pipeline {
    agent any
    stages {
        stage('Test'){
            steps {
                sh 'echo "----Test----"'
                sh 'w'
                sh 'whoami'
            }
        }
        stage('Build') {
            steps {
                sh 'echo "----Build----"'
                sh 'docker build -t best_practice_node_express .'
            }
        }
        stage('Deploy') {
            steps {
                sh 'echo "----Deploy----"'
                sh '''
                CID=$(sudo docker ps | grep "best_practice_node_express" | awk '{print $1}')
                if [ "$CID" != "" ];then
                  sudo docker stop $CID
                  sudo docker rm $CID
                fi
                '''
                sh 'echo $CID'
                sh 'sudo docker run -p 8099:8099 -d --name best_practice_node_express best_practice_node_express'
            }
        }
    }
}
