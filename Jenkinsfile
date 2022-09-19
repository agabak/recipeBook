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
            sh 'npm install && ng build'
          }
        }

      }
    }

    stage('build') {
      steps {
        sh 'ng build --no-aot --no-build-optimizer --base-href ./'
      }
    }

  }
}