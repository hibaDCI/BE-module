import { body } from "express-validator";
import { User } from "../models/users.js";

//custom validation method to find duplicate emails
const checkDuplicateEmail = async (email) => {
  const user = await User.findOne({ email });

  if (user) {
    return Promise.reject("This email already in use!");
  }
};

export const usersValidations = [
  body("name")
    .notEmpty()
    .withMessage("Name field is a required field!")
    .matches(/^[A-Za-z\s]{3,}$/)
    .withMessage("Please use Alphabets and space only for Name field!"),

  body("birthdate")
    .notEmpty()
    .withMessage("Birthdate field is a required field!")
    .isDate()
    .withMessage("Please provide a date for Birthdate field!"),

  body("email")
    .notEmpty()
    .withMessage("Email is required field!")
    .isEmail()
    .withMessage("Invalid Email!")
    .custom(checkDuplicateEmail),

  body("password")
    .notEmpty()
    .withMessage("Password is required!")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)
    .withMessage("Invalid Password!"),

  body("address.city").notEmpty().withMessage("City is a required field!"),

  body("address.zipcode")
    .notEmpty()
    .withMessage("Zipcode is a required field!"),

  body("address.street").notEmpty().withMessage("Street is a required field!"),

  body("address.building")
    .notEmpty()
    .withMessage("Building is a required field!"),
];