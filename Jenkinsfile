pipeline {
    // The entire pipeline runs on the main Jenkins agent
    agent any 
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/JoeMarian/node-ci-cd'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                // Execute Docker CLI commands directly on the agent using 'sh'
                sh 'docker build -t nodejs-api-app:latest .'
                sh 'echo "Docker image nodejs-api-app:latest built successfully"'
            }
        }
        
        stage('Deploy Container') {
            steps {
                // Stop and remove the old container, then run the new one
                sh 'docker stop nodejs-api-container || true'
                sh 'docker rm nodejs-api-container || true'
                // Port mapping: host:container (8000:3000)
                sh 'docker run -d -p 8000:3000 --name nodejs-api-container nodejs-api-app:latest'
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