
# One-Click Jenkins Pipeline Deployment

This DevOps project automates the deployment of a static web page using Jenkins, Docker, Terraform, and Ansible.

## Author
**Saeedulkhair Quaidjohar – 2212302**

## Project Overview

- **Jenkins** runs in Docker and triggers the pipeline.
- **Terraform** provisions a virtual machine on Azure.
- **Ansible** installs Apache and deploys an HTML page.
- The whole process runs with one click from Jenkins.

## Tools Used

- Docker
- Jenkins
- Terraform
- Ansible
- GitHub

## Project Steps

1. Prepare HTML file in `app/index.html`
2. Run Jenkins in Docker
3. Configure Jenkins with SSH credentials
4. Use Terraform to create Azure VM
5. Run Ansible to install Apache and deploy webpage
6. Trigger the Jenkins pipeline to run all stages

## How to Run

```bash
docker run -p 8080:8080 -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts
```

## Notes

- Used VS Code for editing files.
- SSH key setup is important for Ansible access.
- All code is pushed to GitHub and triggered by Jenkins.
