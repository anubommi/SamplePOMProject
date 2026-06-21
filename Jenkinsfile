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

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test --headed'
            }
        }
    }

   
}
