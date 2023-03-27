# How to Install MySQL on Ubuntu?
MySQL is a popular open-source relational database management system used for storing and managing data. Here are the steps to install MySQL on Ubuntu using the command line and APT package manager:

## Step 1: Update Ubuntu
Before installing MySQL, it's a good idea to update Ubuntu to ensure that all the latest packages are installed. Open the terminal and run the following command:

```bash
sudo apt update
```
Enter your password when prompted and wait for the update process to finish.

## Step 2: Install MySQL
Next, use the following command to install MySQL:

```bash
sudo apt install mysql-server
```
This will install the MySQL server package and all its dependencies.

## Step 3: Connect to mysql-server as an administrator
```shell
sudo mysql
```

## Step 4: Set Password to Root user
Switch the authentication method to `native_password`.  
Note that the command ends with `your_root_password_here`. Don't just copy and past it into your terminal.
```shell
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_root_password_here';
exit
```

## Step 5: Secure MySQL
After the installation is complete, run the following command to secure MySQL:

```bash
sudo mysql_secure_installation
```
This will prompt you to 
- Set the MySQL root password (dont change the password), 
- Remove anonymous users (no), 
- Disallow remote root login (yes), 
- Remove test databases (no)
 
Follow the prompts to complete the security configuration.

## Step 4: Start MySQL
Finally, start the MySQL service using the following command:

```bash
sudo systemctl start mysql
```


# How to Open MySQL on Ubuntu?

To open MySQL on Ubuntu through the terminal, you can use the mysql command-line client. Here are the steps:

1. Open the terminal on your Ubuntu system. And type the following command and press Enter to log in to the MySQL server:

    ```bash
    mysql -u username -p
    ```
    Replace `username` with the `MySQL username` you want to log in as. This will prompt you to enter your MySQL password.

2. Enter your MySQL password when prompted and press Enter.

    ***Note: If you haven't set a password for your MySQL user, you can omit the -p option from the command and just press Enter when prompted for a password.***

3. Once you're logged in, you can start executing MySQL commands and queries.

    For example, you can use the following command to show all the databases in the MySQL server:

    ```sql
    SHOW DATABASES;
    ```
    You can also create a new database using the `CREATE DATABASE` command:

    ```sql
    CREATE DATABASE mydatabase;
    ```
    Replace mydatabase with the name you want to give to your new database.

5. To exit the MySQL command-line client, type the following command and press Enter:

    ```bash
    exit
    ```
