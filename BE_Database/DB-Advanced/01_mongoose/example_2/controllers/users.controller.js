import createError from "http-errors";
import User from "../models/users.model.js";

/* ------------------------- get all users ------------------------ */
export const getAllUsers = async (req, res, next) => {
  try {

    //1. find all documents
    const users = await User.find({}, 'firstname lastname birthdate email username role');
    
    //2. send response
    res.status(200).json({
      message: 'list of users',
      users
    })
    
  } catch (error) {
    next(error);
  }
};




/* ------------------------- add new user ------------------------- */
export const addNewUser = async (req, res, next) => {
  try {
    //1. read the req.body (destructure)
    const { firstname, lastname, birthdate, username, email, password, role } = req.body;

    //2. create a user document
    const newUser = await User.create({
      firstname, lastname, birthdate,
      username, email, password, role,
    });

    //3. remove password (for security)- keep password in db
    newUser.password = undefined;

    //4. send response
    res.status(200).json({
      message: 'user registered successfully!',
      user: newUser
    });

  } catch (error) {
    next(error);
  }
};





















/* ------------------------ get user by id ------------------------ */
export const getUserById = async (req, res, next) => {
  try {
    //read and evaluate userid from url
    const uid = req.params.uid;

    const foundUser = await User.findById(uid);
    if (!foundUser) {
      return next(createError(404, "There is no user for given user-id! 🚨"));
    }
    
    res.status(200).json({
      message: "found user successful!",
      user: {...foundUser, fullname: foundUser.fullname},
    });
  } catch (error) {
    next(error);
  }
};

/* ----------------------- update user by id ---------------------- */
export const updateUser = async (req, res, next) => {
  try {
    const uid = parseInt(req.params.uid);
    if (isNaN(uid)) {
      return next(createError(400, "User-id must be a number! 🚨"));
    }

    const uIndex = db.data.users.findIndex((u) => u.id === uid);
    if (uIndex === -1) {
      return next(createError(404, "There is no user with given user-id! 🚨"));
    }
    //update user in db
    db.data.users[uIndex] = { ...db.data.users[uIndex], ...req.body };
    await db.write();

    //destructure the updated user to send insensitive data to client
    const { fullname, username, email, password } = db.data.users[uIndex];
    res.status(200).json({
      message: "update successful!",
      user: { fullname, username, email, password },
    });
  } catch (error) {
    next(error);
  }
};

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
      return next(createError(404, "There is no user with given user-id! 🚨"));
    }

    //delete todos for given user
    db.data.todos = db.data.todos.filter((todo) => todo.user !== uid);
    //delete user from db
    db.data.users.splice(uIndex, 1);
    await db.write();

    res.status(200).json({
      message: `user ${uid} with all related todos deleted successfully!`,
    });
  } catch (error) {
    next(error);
  }
};
