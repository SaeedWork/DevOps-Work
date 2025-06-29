pipeline {
  agent any

  environment {
    TF_VAR_admin_username = 'azureuser'
    TF_VAR_ssh_public_key_path = '/root/.ssh/id_rsa.pub'
    
    ARM_CLIENT_ID       = credentials('ARM_CLIENT_ID')
    ARM_CLIENT_SECRET   = credentials('ARM_CLIENT_SECRET')
    ARM_SUBSCRIPTION_ID = credentials('ARM_SUBSCRIPTION_ID')
    ARM_TENANT_ID       = credentials('ARM_TENANT_ID')
  }

  stages {

    stage('Terraform Init') {
      steps {
        dir('/workspace/terraform') {
          sh 'terraform init'
        }
      }
    }

    stage('Terraform Apply') {
      steps {
        dir('/workspace/terraform') {
          sh 'terraform apply -auto-approve'
        }
      }
    }

    stage('Terraform Output') {
      steps {
        dir('/workspace/terraform') {
          sh 'terraform output -raw public_ip > ../ansible/host_ip.txt'
        }
      }
    }

    stage('Generate hosts.yml') {
      steps {
        dir('/workspace/ansible') {
          sh '''
            PUBLIC_IP=$(cat host_ip.txt)
            sed "s/__PUBLIC_IP__/$PUBLIC_IP/" hosts.tpl.yml > hosts.yml
          '''
        }
      }
    }

    stage('Run Ansible Playbook') {
      steps {
        dir('/workspace/ansible') {
          sh 'ansible-playbook -i hosts.yml install_web.yml'
        }
      }
    }

    stage('Verify Deployment') {
      steps {
        sh '''
          sleep 10
          IP=$(terraform/output -raw public_ip)
          curl http://$IP
        '''
      }
    }
  }
}
