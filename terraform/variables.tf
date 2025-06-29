variable "location" {
  description = "The Azure region where resources will be deployed"
  type        = string
  default     = "East Asia"
}

variable "ssh_public_key_path" {
  description = "Path to the SSH public key"
  type        = string
}
