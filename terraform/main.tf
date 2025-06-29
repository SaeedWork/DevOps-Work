provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = "SaeedProjectRG"
  location = var.location
}

resource "azurerm_linux_virtual_machine" "vm" {
  name                = "sk-project-vm"
  resource_group_name = azurerm_resource_group.rg.name
  location            = var.location
  size                = "Standard_B1s"
  admin_username      = "azureuser"

  network_interface_ids = [azurerm_network_interface.nic.id]

  admin_ssh_key {
    username   = "azureuser"
    public_key = file(var.ssh_public_key_path)
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "UbuntuServer"
    sku       = "18.04-LTS"
    version   = "latest"
  }
}

resource "azurerm_network_interface" "nic" {
  name                = "sk-project-nic"
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name

  ip_configuration {
    name                          = "ipconfig"
    subnet_id                     = azurerm_subnet.subnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.pip.id
  }
}

resource "azurerm_public_ip" "pip" {
  name                = "sk-project-pip"
  location            = "eastasia"
  resource_group_name = azurerm_resource_group.rg.name
  allocation_method   = "Static" 
  sku                 = "Standard" 
  sku_tier            = "Regional"
  ip_version          = "IPv4"
  idle_timeout_in_minutes = 4
  ddos_protection_mode = "VirtualNetworkInherited"
}

resource "azurerm_virtual_network" "vnet" {
  name                = "sk-project-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name
}

resource "azurerm_subnet" "subnet" {
  name                 = "sk-project-subnet"
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes     = ["10.0.1.0/24"]
}
