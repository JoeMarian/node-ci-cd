pipeline {
    agent any 
    
    environment {
        DOCKER_CMD = '/usr/local/bin/docker' 
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/JoeMarian/node-ci-cd'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                // Set DOCKER_BUILDKIT=0 to force the classic builder and bypass the credential helper issue.
                sh "DOCKER_BUILDKIT=0 ${DOCKER_CMD} build -t nodejs-api-app:latest ."
                sh 'echo "Docker image nodejs-api-app:latest built successfully"'
            }
        }
        
        stage('Deploy Container') {
            steps {
                sh "${DOCKER_CMD} stop nodejs-api-container || true"
                sh "${DOCKER_CMD} rm nodejs-api-container || true"
                sh "${DOCKER_CMD} run -d -p 8000:3000 --name nodejs-api-container nodejs-api-app:latest"
                sh 'echo "Application deployed and accessible on port 8000"'
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline finished.'
        }
        failure {
            echo 'Pipeline failed. Check logs.'
        }
    }
}