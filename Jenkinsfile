pipeline {
  agent any
  stages {
    stage('checkoutcode') {
      steps {
        git(url: 'https://github.com/agabak/recipeBook', branch: 'master')
      }
    }

    stage('logd') {
      steps {
        sh 'ls -la'
      }
    }

  }
}