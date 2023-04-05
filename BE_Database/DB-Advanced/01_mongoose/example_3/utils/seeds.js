import User from '../models/users.model.js'
import { faker } from '@faker-js/faker';

export const seedUsers = async (minDocs) => {
    try {
        let users = [];

        // check the number of current users in db
        const numOfUsersInDB = await User.countDocuments();
        if (minDocs < numOfUsersInDB) {
            return console.log('There are enough User document in DB!');
        }

        // generate sample data
        for (let i = 0; i < (minDocs - numOfUsersInDB); i++){
            const user = {};
            user.firstname = faker.name.firstName();
            user.lastname = faker.name.lastName();
            user.birthdate = faker.date.birthdate();
            user.email = faker.internet.email(user.firstname, user.lastname, 'mail.com');
            user.username = faker.internet.userName(user.firstname, user.lastname);
            user.password = faker.internet.password(10, true, /^[\w\W]{8,}$/);
            user.role = faker.helpers.arrayElement(['admin', 'user']);

            users.push(user)
        }

        //insert user documents to db
        await User.create(users);
        console.log('user document added successfully!');
       
    } catch (error) {
        console.log(error.message);
    }
}