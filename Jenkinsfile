pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'tradehubnewproject'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/ELANGESWARANKISHOR/Tradehubnewproject.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Build Docker images for each service
                    def services = ['order-service', 'product-service', 'seller-service', 'user-service', 'frontend']
                    services.each { service ->
                        sh "docker build -t ${DOCKER_IMAGE}-${service} ./tradehub-backend/${service}"
                    }
                }
            }
        }

        stage('Run Docker Compose') {
            steps {
                script {
                    // Stop and remove existing containers
                    sh 'docker-compose down'

                    // Build and start containers in detached mode
                    sh 'docker-compose up -d --build'
                }
            }
        }

        stage('Test Services') {
            steps {
                script {
                    // Example: Check if the frontend service is running
                    def status = sh(script: 'docker ps -q -f name=tradehubnewproject-frontend', returnStdout: true).trim()
                    if (!status) {
                        error "Frontend service is not running!"
                    }
                }
            }
        }

        stage('Clean Up') {
            steps {
                script {
                    // Optionally, remove orphaned containers
                    sh 'docker-compose down --remove-orphans'
                }
            }
        }
    }

    post {
        always {
            // Clean up Docker images to free space
            sh 'docker system prune -af'
        }
    }
}
