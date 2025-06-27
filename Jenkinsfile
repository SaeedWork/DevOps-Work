pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building the project...'
                sh 'echo "Running build commands (e.g., mvn clean package)"'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'echo "Running test commands (e.g., mvn test)"'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                sh 'echo "Running deploy commands (e.g., deploy to server)"'
            }
        }
    }
    post {
        always {
            echo 'Pipeline execution completed!'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
