pipeline {
    agent any

    /*
     * ── Environment ────────────────────────────────────────────────────────────
     * Adjust JAVA_HOME / MAVEN_HOME / NODE_HOME to match your Jenkins node.
     */
    environment {
        APP_NAME       = 'devops-profile-hub'
        BACKEND_IMAGE  = 'devops-profile-hub-backend'
        FRONTEND_IMAGE = 'devops-profile-hub-frontend'
        DOCKER_TAG     = "${env.BUILD_NUMBER ?: 'latest'}"

        // Uncomment and set the paths that match your Jenkins node:
        // JAVA_HOME  = '/usr/lib/jvm/java-17-openjdk-amd64'
        // MAVEN_HOME = '/opt/maven'
        // NODE_HOME  = '/usr/local/lib/nodejs/node-v22'
        // PATH       = "${MAVEN_HOME}/bin:${NODE_HOME}/bin:${env.PATH}"
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
    }

    stages {

        /* ────────────────────────────────────────────────────────────────────
         * Stage 1 — Checkout
         * Pulls the source from GitHub. Configure the repository URL in the
         * Jenkins job (or replace the URL below with your actual repo URL).
         * ─────────────────────────────────────────────────────────────────── */
        stage('Checkout') {
            steps {
                echo '📥 Checking out source code…'
                checkout scm
                /*
                 * If you prefer an explicit clone, replace `checkout scm` with:
                 *
                 * git url: 'https://github.com/<your-username>/devops-profile-hub.git',
                 *     branch: 'main'
                 */
            }
        }

        /* ────────────────────────────────────────────────────────────────────
         * Stage 2 — Build Backend
         * Compiles the Spring Boot application and runs unit tests.
         * ─────────────────────────────────────────────────────────────────── */
        stage('Build Backend') {
            steps {
                echo '☕ Building Spring Boot backend with Maven…'
                dir('backend') {
                    sh 'mvn clean install -B -DskipTests=false'
                }
            }
            post {
                success { echo '✅ Backend build succeeded.' }
                failure { echo '❌ Backend build failed.' }
            }
        }

        /* ────────────────────────────────────────────────────────────────────
         * Stage 3 — Build Frontend
         * Installs npm dependencies and produces the Vite production bundle.
         * ─────────────────────────────────────────────────────────────────── */
        stage('Build Frontend') {
            steps {
                echo '⚛️  Building React frontend with npm…'
                dir('frontend') {
                    sh '''
                        node --version
                        npm --version
                        npm install
                        npm run build
                    '''
                }
            }
            post {
                success { echo '✅ Frontend build succeeded.' }
                failure { echo '❌ Frontend build failed.' }
            }
        }

        /* ────────────────────────────────────────────────────────────────────
         * Stage 4 — Docker Build
         * Builds Docker images for both services.
         * Requires Docker to be available on the Jenkins node / agent.
         * ─────────────────────────────────────────────────────────────────── */
        stage('Docker Build') {
            steps {
                echo '🐳 Building Docker images…'
                script {
                    sh """
                        docker build -t ${BACKEND_IMAGE}:${DOCKER_TAG} \
                                     -t ${BACKEND_IMAGE}:latest \
                                     ./backend
                    """
                    sh """
                        docker build -t ${FRONTEND_IMAGE}:${DOCKER_TAG} \
                                     -t ${FRONTEND_IMAGE}:latest \
                                     ./frontend
                    """
                    echo "Built images: ${BACKEND_IMAGE}:${DOCKER_TAG}, ${FRONTEND_IMAGE}:${DOCKER_TAG}"
                }
            }
            post {
                success { echo '✅ Docker images built successfully.' }
                failure { echo '❌ Docker build failed.' }
            }
        }

        /* ────────────────────────────────────────────────────────────────────
         * Stage 5 — Deploy (optional)
         * Launches the full stack with docker-compose.
         * Comment-out or remove this stage if you only want to build.
         * ─────────────────────────────────────────────────────────────────── */
        stage('Deploy with Docker Compose') {
            when {
                // Only deploy on the main / master branch
                anyOf {
                    branch 'main'
                    branch 'master'
                }
            }
            steps {
                echo '🚀 Deploying stack with docker-compose…'
                sh '''
                    docker-compose down --remove-orphans || true
                    docker-compose up -d --build
                    echo "✅ Stack is up!"
                    docker-compose ps
                '''
            }
            post {
                success {
                    echo """
                    ╔══════════════════════════════════════════════╗
                    ║   Deployment successful!                      ║
                    ║   Frontend  → http://localhost:8081            ║
                    ║   Backend   → http://localhost:8083/profile    ║
                    ╚══════════════════════════════════════════════╝
                    """
                }
                failure { echo '❌ Deployment failed.' }
            }
        }
    }

    /* ── Post-pipeline notifications ──────────────────────────────────────── */
    post {
        always {
            echo "Pipeline finished. Build #${env.BUILD_NUMBER} — ${currentBuild.result ?: 'SUCCESS'}"
        }
        success {
            echo '🎉 Pipeline completed successfully!'
        }
        failure {
            echo '🔥 Pipeline failed. Check the logs above for details.'
        }
        unstable {
            echo '⚠️  Pipeline is unstable (some tests may have failed).'
        }
    }
}
