env.APISTG='api-stage.mcpayment.id'

pipeline {
    
    agent any

    // tools {
    //     nodejs "node-sonar"
    // }


    environment { 
        APIDEV = credentials('url-api-dev-v2')
        HASHKEYDEV = credentials('hashkeydev')
        HASHKEYSTG = credentials('hashkeystg')
        UNBOUNDKEYSTG = credentials('unboundkeystg')
        UNBOUNDKEYDEV = credentials('unboundkeydev')
    }
    
    stages {
        stage('Git') {
            steps {
                step([$class: 'WsCleanup'])
                checkout scm
                script {
                    env.AUTHOR_NAME = sh(script: "git log -n 1 ${env.GIT_COMMIT} --format=%aN", returnStdout: true).trim()
                    echo "Author name of last commit is ${env.AUTHOR_NAME}"
                    committer_name = sh(script: "git log -n 1 ${env.GIT_COMMIT} --format=%cN", returnStdout: true).trim()
                    echo "Committer name of last commit is ${committer_name}"
                    commit_message = sh(script: "git log -1 --format=%B ${GIT_COMMIT}", returnStdout: true).trim()
                    echo "Commit message of last commit is ${commit_message}"
                }
            }
        }
        // stage('SonarQube analysis') {
        //     when {
        //         branch 'mcpid-dev'
        //     }
        //     steps {
        //         script{
        //             scannerHome = tool 'sonarqube';
        //         }
        //         withSonarQubeEnv('sonarqube') { // If you have configured more than one global server connection, you can specify its name
        //             sh "${scannerHome}/bin/sonar-scanner \
        //             -Dsonar.projectKey=paymentpage-fe \
        //             -Dsonar.sources=. \
        //             -Dsonar.host.url=https://sonarqube-dev.mcpayment.id \
        //             -Dsonar.login=$SONARTOKEN"
        //         }
        //     }         
        // }
        stage('Build image Dev') {
            when {
                branch 'mcpid-dev'
            }
            steps {
                sh """
                mv .env.example .env
                sed -i 's/hashkey/$HASHKEYDEV/g' .env
                sed -i 's/unboundkey/$UNBOUNDKEYDEV/g' .env
                sed -i 's/url-api/$APIDEV/g' .env
                docker build -t mcpidinfra/simulator-va-pg2-dev:$BUILD_NUMBER .
                """
            }
        }
        stage('Build image stg') {
            when {
                branch 'mcpid-stg'
            }
            steps {
                sh """
                mv .env.example .env
                sed -i 's/hashkey/$HASHKEYSTG/g' .env
                sed -i 's/unboundkey/$UNBOUNDKEYSTG/g' .env
                sed -i 's/url-api/$APISTG/g' .env
                docker build -t mcpidinfra/simulator-va-pg2-stg:$BUILD_NUMBER .
                """
            }
        }
        stage('Push Image Dev') {
            when {
                branch 'mcpid-dev'
            }
            steps {
                sh 'docker push mcpidinfra/simulator-va-pg2-dev:$BUILD_NUMBER'
            }
        }
        stage('Push Image stg') {
            when {
                branch 'mcpid-stg'
            }
            steps {
                sh 'docker push mcpidinfra/simulator-va-pg2-stg:$BUILD_NUMBER'
            }
        }
        stage('Deploy to DEV-BASTION') {
            agent { node { label 'DEV-BASTION' } }
            when {
                branch 'mcpid-dev'
            }
            steps {
                checkout scm
                sh """
                sed -i 's/latest/$BUILD_NUMBER/g' simulator-va-pg2.yaml
                kubectl apply -f simulator-va-pg2.yaml
                """
            }      
        }
        stage('Deploy to STG-BASTION') {
            agent { node { label 'STG-BASTION' } }
            when {
                branch 'mcpid-stg'
            }
            steps {
                checkout scm
                sh """
                sed -i 's/simulator-va-pg2-dev/simulator-va-pg2-stg/g' simulator-va-pg2.yaml
                sed -i 's/latest/$BUILD_NUMBER/g' simulator-va-pg2.yaml
                kubectl apply -f simulator-va-pg2.yaml
                """
            }      
        }
        // stage('Deploy to Server Stg PHP-01') {
        //     agent { node { label 'STGPHP-01' } }
        //     when {
        //         branch 'mcpid-stg'
        //     }
        //     steps {
        //         checkout scm
        //         sh """
        //         sed -i 's/payment-fe-dev/payment-fe-stg/g' docker-compose.yml
        //         sed -i 's/latest/$BUILD_NUMBER/g' docker-compose.yml
        //         docker-compose up -d
        //         """
        //     }      
        // }
        stage('Remove image dev') {
            when {
                branch 'mcpid-dev'
            }
            steps {
                sh 'docker rmi mcpidinfra/simulator-va-pg2-dev:$BUILD_NUMBER'
            }      
        }
        stage('Remove image stg') {
            when {
                branch 'mcpid-stg'
            }
            steps {
                sh 'docker rmi mcpidinfra/simulator-va-pg2-stg:$BUILD_NUMBER'
            }      
        }       
    }
    post {
        success {
            slackSend channel: "jenkins-notif-service", tokenCredentialId: "slack_mcp", color: "good", message: "*SUCCESS*\n Job: *${env.JOB_NAME}* build no.${env.BUILD_NUMBER} \n Environment: `${env.BRANCH_NAME}`\n by ${env.AUTHOR_NAME}\n More info at: ${env.BUILD_URL}"
        }
        failure {
            slackSend channel: "jenkins-notif-service", tokenCredentialId: "slack_mcp", color: "danger", message: "*ERROR*\n Job: *${env.JOB_NAME}* build no.${env.BUILD_NUMBER} \n Environment: `${env.BRANCH_NAME}`\n by ${env.AUTHOR_NAME}\n More info at: ${env.BUILD_URL}"
        }
    }  
}
