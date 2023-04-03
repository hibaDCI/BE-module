import User from '../models/users.model.js'
import { faker } from '@faker-js/faker';

export const seedUsers = async (minDocs) => {
    try {
        
        /** check number of current users */
        const numCurDocs = await User.countDocuments();
        if (minDocs <= numCurDocs) {
            return console.log('Skipped user seeding.');
        }

        /** Generate sample data */
        const userRoles = ['admin', 'user'];
        const users = Array.from({ length: minDocs }, () => {
            const firstname = faker.name.firstName();
            const lastname = faker.name.lastName();
            const birthdate = faker.date.birthdate();
            const username = faker.internet.userName();
            const email = faker.internet.email();
            const password = faker.internet.password();
            const role = faker.helpers.arrayElement(userRoles);

            return ({
                firstname, lastname, birthdate,
                username, email, password,
                role
            })
        });

        //Insert to Users
        await User.insertMany(users);
        console.log('Sample data added successfully!');



    } catch (error) {
        console.log(error.message);
    }
}