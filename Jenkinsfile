pipeline {
agent any

```
environment {
    APP_NAME       = 'devops-profile-hub'
    BACKEND_IMAGE  = 'devops-profile-hub-backend'
    FRONTEND_IMAGE = 'devops-profile-hub-frontend'
    DOCKER_TAG     = "${env.BUILD_NUMBER ?: 'latest'}"
}

options {
    buildDiscarder(logRotator(numToKeepStr: '10'))
    timeout(time: 30, unit: 'MINUTES')
    timestamps()
}

stages {

    stage('Checkout') {
        steps {
            echo '📥 Checking out source code...'
            checkout scm
        }
    }

    stage('Build Backend') {
        steps {
            echo '☕ Building Spring Boot backend...'
            dir('backend') {
                bat 'mvn clean install -B'
            }
        }
        post {
            success { echo '✅ Backend build succeeded.' }
            failure { echo '❌ Backend build failed.' }
        }
    }

    stage('Build Frontend') {
        steps {
            echo '⚛️ Building React frontend...'
            dir('frontend') {
                bat 'node --version'
                bat 'npm --version'
                bat 'npm install'
                bat 'npm run build'
            }
        }
        post {
            success { echo '✅ Frontend build succeeded.' }
            failure { echo '❌ Frontend build failed.' }
        }
    }

    stage('Docker Build') {
        steps {
            echo '🐳 Building Docker images...'
            bat "docker build -t %BACKEND_IMAGE%:%DOCKER_TAG% backend"
            bat "docker build -t %FRONTEND_IMAGE%:%DOCKER_TAG% frontend"
        }
        post {
            success { echo '✅ Docker images built successfully.' }
            failure { echo '❌ Docker build failed.' }
        }
    }

    stage('Deploy with Docker Compose') {
        steps {
            echo '🚀 Deploying application...'
            bat 'docker-compose down'
            bat 'docker-compose up -d --build'
        }
        post {
            success {
                echo '''
```

Deployment successful!
Frontend: http://localhost:8081
Backend:  http://localhost:8083/profile
'''
}
failure { echo '❌ Deployment failed.' }
}
}
}

```
post {
    always {
        echo "Pipeline finished. Build #${env.BUILD_NUMBER} — ${currentBuild.result ?: 'SUCCESS'}"
    }
    success {
        echo '🎉 Pipeline completed successfully!'
    }
    failure {
        echo '🔥 Pipeline failed. Check logs above.'
    }
}
```

}
