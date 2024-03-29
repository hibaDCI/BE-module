import createError from "http-errors";
import User from "../models/users.model.js";

/* ------------------------- get all users ------------------------ */
export const getAllUsers = async (req, res, next) => {
  try {

    //1. find all documents
    const users = await User.find({isDeleted: false}, 'firstname lastname birthdate email username role');
    
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

    //using a virtual
    console.log('fullname:', newUser.fullname);

    //using methods
    console.log(newUser.getAge());

    //use statics
    console.log(await User.getAdmins());
    
    //4. send response
    res.status(201).json({
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
    //read params uid
    const { uid } = req.params;

    const updatedUser = await User
      .findByIdAndUpdate(
        uid, { ...req.body }, { new: true, runValidators: true });
    res.status(200).json({
      message: 'user updated successfully!',
      user: updatedUser
    })
    
  } catch (error) {
    next(error);
  }
};












/* ----------------------- delete user by id ---------------------- */
export const deleteUser = async (req, res, next) => {
  try {
    //read uid from params
    const { uid } = req.params;

    //hard delete
    // const result = await User.findByIdAndRemove(uid);
    // res.status(200).json({
    //   message: "User deleted successfully!",
    //   result
    // });

    //soft delete
    const softDeletedUser = await User
      .findByIdAndUpdate(uid, { isDeleted: true }, { new: true });
    res.status(200).json({
      message: "User deactivated!",
      user: softDeletedUser
    })


  } catch (error) {
    next(error);
  }
};
