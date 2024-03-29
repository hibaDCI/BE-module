import createError from 'http-errors';
import { db } from '../server.js';



/* ------------------------- get all users ------------------------ */
export const getAllUsers = async (req, res, next) => {
    
    try {
        res.status(200).json({ message: 'get users successful', users: db.data.users });       
    } catch (error) {
        next(error)
    }
}

/* ------------------------- add new user ------------------------- */
export const addNewUser = async (req, res, next) => {
    try {
        const { users } = db.data;
        const { fullname, username, password, email } = req.body;
        
        if (req.validationErrors.length) {
            return res.status(400).json({message: 'validation Errors', errors: req.validationErrors})
        }
        
        //create new user
        const newUser = {
            id: users.slice(-1)[0]?.id+1 || 1,
            fullname: fullname,
            username: username,
            password: password,
            email: email
        }

        //add newUser to db
        users.push(newUser);
        db.data.users = users;
        await db.write();

        //remove password
        delete newUser.password;
        res.status(200).json({
            message: 'add user successful!',
            newUser
        });

    } catch (error) {
        next(error)
    }
}

/* ------------------------ get user by id ------------------------ */
export const getUserById = async (req, res, next) => {
    try {
        //read and evaluate userid from url
        const uid = parseInt(req.params.uid);
        if (isNaN(uid)) {
            return next(createError(400, 'User-id must be a number! 🚨'));
        }

        const foundUser = db.data.users.find(u => u.id === uid);
        if (!foundUser) {
            return next(createError(404, 'There is no user for given user-id! 🚨'))
        }

        res.status(200).json({
            message: 'found user successful!',
            user: foundUser
        })

    } catch (error) {
        next(error)
    }
}


/* ----------------------- update user by id ---------------------- */
export const updateUser = async (req, res, next) => {
    try {
        const uid = parseInt(req.params.uid);
        if (isNaN(uid)) {
          return next(createError(400, "User-id must be a number! 🚨"));
        }

        const uIndex = db.data.users.findIndex(u => u.id === uid);
        if (uIndex === -1) {
            return next(createError(404, "There is no user with given user-id! 🚨"))
        }
        //update user in db
        db.data.users[uIndex] = { ...db.data.users[uIndex], ...req.body }
        await db.write();

        //destructure the updated user to send insensitive data to client
        const { fullname, username, email, password } = db.data.users[uIndex];
        res.status(200).json({
            message: 'update successful!',
            user: { fullname, username, email, password }
        });


    } catch (error) {
        next(error)
    }
}


/* ----------------------- delete user by id ---------------------- */
export const deleteUser = async (req, res, next) => {
    try {
        //read and assess uid from url
        const uid = parseInt(req.params.uid);
        if (isNaN(uid)) {
          return next(createError(400, "User-id must be a number! 🚨"));
        }
        
        //find index of user with given uid
        const uIndex = db.data.users.findIndex((u) => u.id === uid);
        if (uIndex === -1) {
          return next(
            createError(404, "There is no user with given user-id! 🚨")
          );
        }

        //delete todos for given user
        db.data.todos = db.data.todos.filter(todo=> todo.user !== uid)
        //delete user from db
        db.data.users.splice(uIndex, 1);
        await db.write();

        res.status(200).json({
            message: `user ${uid} with all related todos deleted successfully!`
        })

    } catch (error) {
        next(error)
    }
}