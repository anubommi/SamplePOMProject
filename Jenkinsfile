pipeline {
    agent any

    tools {
        nodejs 'Node18'   // must match the name you set in Global Tool Configuration
    }

    triggers {
        githubPush()      // listens for GitHub webhook events
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/anubommi/SamplePOMProject.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test'
            }
        }
    }

    post {
        always {
            junit 'test-results/*.xml'   // publish test results if available
            publishHTML(target: [
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                keepAll: true,
                reportName: 'Playwright Test Report'
            ])
        }
    }
}
