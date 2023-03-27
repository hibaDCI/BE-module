# How to Install Mongodb on Ubunto

Here is a step-by-step guide on how to install MongoDB and the Mongo Shell on Ubuntu:

1. Update the Ubuntu system:

    ```sql
    sudo apt-get update
    ```

2. Install MongoDB by running the following command:

    ```sql
    sudo apt-get install mongodb
    ```

3. Verify that MongoDB has been installed successfully by checking its service status:

    ```sql
    sudo systemctl status mongodb
    ```

    If MongoDB is running, you should see an output that says "Active (running)".

4. Install the Mongo Shell by running the following command:

    ```sql
    sudo apt-get install mongo-tools
    ```

5. Verify that the Mongo Shell has been installed successfully by running the following command:

    ```sql
    mongo --version
    ```

    This should show the version of the Mongo Shell that has been installed.

6. Connect to the MongoDB instance using the Mongo Shell by running the following command:

    ```sql
    mongo
    ```

    This will connect you to the MongoDB instance running on your system.


That's it! You have now installed MongoDB and the Mongo Shell on your Ubuntu system. You can start using the Mongo Shell to interact with MongoDB and manage your data.




