import mongoose from 'mongoose';
import { checkServerIdentity } from 'tls';

const parentSchema = new mongoose.Schema({
    field1: String,
    field4: child
});

const child = new mongoose.Schema({
    child_field1: String,
    child_field2: String
});


/* ------------------------ second approach ----------------------- */

const parentSchema2 = new mongoose.Schema({
    field1: String,
    field4: {
        child_field1: String,
        child_field2: Number
    }
});


const userSchema1 = new mongoose.Schema({
    email: String,
    password: String,
    fullname: String,
    address: {
        city: String,
        street: String,
        building: Number,
        postalCode: Number
    }
})

// {
//     email: 'fahim@mail.com',
//     password: '123',
//     fullname: "Fahim Ahmadi",
//     address: {
//         city: "berlin",
//         street: "trift",
//         building: 10,
//         postalCode: 300315
//             }
// }



const userSchema2 = new mongoose.Schema({
    email: String,
    password: String,
    fullname: String,
    address: [addressSchema]
})
const addressSchema = new mongoose.Schema({
  city: String,
  street: String,
  building: Number,
  postalCode: Number,
}, {_id: false});


// When I want to insert data into userSchema2

//1.
const addressDoc1 = Address.create({
    city: "berlin",
    street: "trift",
    building: 10,
    postalCode: 300315
})
const addressDoc2 = Address.create({
    city: "berlin",
    street: "dusseldorfer",
    building: 1,
    postalCode: 250310
})
//2.
const user = User.create({
    email: "fahim@mail.com",
    password: '123',
    fullname: "Fahim Ahmadi",
    address: [addressDoc1, addressDoc2]
})