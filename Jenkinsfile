pipeline {
  agent any
  stages {
    stage('checkoutcode') {
      steps {
        git(url: 'https://github.com/agabak/recipeBook', branch: 'master')
      }
    }

    stage('logs') {
      parallel {
        stage('logs') {
          steps {
            sh 'ls -la'
          }
        }

        stage('Front end') {
          steps {
            sh 'npm install source-map-resolve'
          }
        }

      }
    }

  }
}