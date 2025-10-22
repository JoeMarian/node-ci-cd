pipeline {
    // Use 'any' as the default agent for the Jenkins node itself
    agent any 
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/JoeMarian/node-ci-cd'
            }
        }
        
        stage('Build Docker Image') {
            // **Agent is required for 'docker' steps**
            agent {
                // Use the image your Dockerfile is based on for a clean build environment
                docker { image 'node:20-alpine' } 
            }
            steps {
                // Now you can use sh 'docker build...' directly, or stick to the DSL:
                sh 'docker build -t nodejs-api-app:latest .'
                sh 'echo "Docker image nodejs-api-app:latest built successfully"'
            }
        }
        
        stage('Deploy Container') {
            steps {
                // Deploy requires access to the host's Docker daemon
                sh 'docker stop nodejs-api-container || true'
                sh 'docker rm nodejs-api-container || true'
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