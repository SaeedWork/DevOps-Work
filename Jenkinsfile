pipeline {
  agent any

  environment {
    TF_VAR_admin_username = 'azureuser'
    TF_VAR_ssh_public_key_path = '/root/.ssh/id_rsa.pub'
  }

  stages {
    stage('Clone Repo') {
      steps {
        git 'https://github.com/yourusername/your-repo.git'
      }
    }

    stage('Terraform Init') {
      dir('terraform') {
        steps {
          sh 'terraform init'
        }
      }
    }

    stage('Terraform Apply') {
      dir('terraform') {
        steps {
          sh 'terraform apply -auto-approve'
        }
      }
    }

    stage('Get Public IP and Replace Inventory') {
        steps {
         script {
           def publicIp = sh(script: "cd terraform && terraform output -raw public_ip", returnStdout: true).trim()
           sh """
           sed -i "s/__PUBLIC_IP__/${publicIp}/" ansible/hosts.yml
            """
        }
      }
    }

    stage('Configure Server with Ansible') {
      steps {
        sh 'ansible-playbook -i ansible/hosts.yml ansible/install_web.yml'
      }
    }

    stage('Verify Deployment') {
      steps {
        script {
          def publicIp = sh(script: "cd terraform && terraform output -raw public_ip", returnStdout: true).trim()
          sh "curl http://${publicIp}"
        }
      }
    }
  }

  post {
    success {
      echo 'Deployment completed successfully!'
    }
    failure {
      echo 'Deployment failed. Check logs.'
    }
  }
}
