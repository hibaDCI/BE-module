import { check } from 'express-validator';

export const usersValidations = [
    check("email")
            .isEmail().withMessage("Please provide a valid email format!"),
    check("name")
            .isAlpha().withMessage("Please use alphabets only for Name field!"),
];
