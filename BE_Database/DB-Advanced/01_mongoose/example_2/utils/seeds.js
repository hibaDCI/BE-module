import User from '../models/users.model.js'
import { faker } from '@faker-js/faker';

export const seedUsers = async (minDocs) => {
    try {
        let users = [];

        // check the number of current users in db
        numOfUsersInDB = await User.countDocuments();
        if (minDocs < numOfUsersInDB) {
            return console.log('There are enough User document in DB!');
        }

        // generate sample data
        for (let i = 0; i < (minDocs - numOfUsersInDB); i++){
            const user = {};
            user.name = faker.name.fullName();
            user.email = faker.internet.email();

            users.push(user)
        }

        //insert user documents to db
        await User.create(users);
        console.log('user document added successfully!');
       
    } catch (error) {
        console.log(error.message);
    }
}