node {
    // Clean workspace before doing anything
    deleteDir()
    env.NODEJS_HOME = "${tool 'Node 6.14.1'}"

    try {
        stage('Initialize') {
            echo 'Initializing...'
            env.NODEJS_HOME = "${tool 'Node 6.14.1'}"
            env.PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"
        }
        stage ('Clone') {
            checkout scm
        }
        stage ('NPM Install') {
            sh "npm install"
        }
        stage ('Lint check') {
            sh "npm run lint"
        }
    } catch (err) {
        currentBuild.result = 'FAILED'
        throw err
    }
}