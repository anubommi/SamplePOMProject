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
                bat 'npx playwright test'
            }
        }
      stage('Generate Allure Report') {
    steps {
        bat 'allure generate allure-results --clean -o allure-report'
    }
}  
    }
    

    post {
        always {
            // Publish JUnit results in Jenkins "Test Result" tab
            junit 'test-results/results.xml'

            // Publish Playwright HTML report in Jenkins sidebar
            publishHTML(target: [
                reportDir: 'allure-report',
                reportFiles: 'index.html',
                keepAll: true,
                reportName: 'Allure Report'
            ])
            allure([
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']]
            ])

            // Archive the report artifacts for download
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
        }
    }
   
}
