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
                git branch: 'master', url: 'https://github.com/anubommi/SamplePOMProject.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Install Playwright Browsers') {
      steps {
        bat 'npx playwright install'
      }
    }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test --reporter=junit --reporter=html'
            }
        }
        
    }

    post {
        always {
            // Publish JUnit results in Jenkins "Test Result" tab
            junit 'test-results/*.xml'

            // Publish Playwright HTML report in Jenkins sidebar
            publishHTML(target: [
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                keepAll: true,
                reportName: 'Playwright Test Report'
            ])

            // Archive the report artifacts for download
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
        }
    }
}
