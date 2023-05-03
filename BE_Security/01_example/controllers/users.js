import { Address, User } from "../models/users.js";
import { Product } from "../models/products.js";
import { Cart } from "../models/carts.js";
import createError from "http-errors";
import { createToken } from "../utils/jwt.js";

// POST /users/signup
export const signup = async (req, res, next) => {
  try {
    console.log("controller");

    // destructure and check required fields
    const { name, birthdate, email, password, role, address } = req.body;

    //create new address
    const newAddress = await Address.create(address);
    if (!newAddress) {
      throw createError(400, "Something in your address is not correct!");
    }
    //create new user
    const newUser = await User.create({
      name,
      birthdate,
      email,
      password,
      address: newAddress._id,
      role,
    });

    //remove password from newUser before sending to frontend
    newUser.password = undefined;

    //create JWT
    const token = await createToken(
      { userid: newUser._id, userrole: newUser.role },
      process.env.JWT_SECRET
    );

    //set cookie and store jwt token inside it.
    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 48,
      SameSite: `none`,
      secure: false,
      domain: "127.0.0.1",
    });

    //send response
    res.status(201).json({
      message: "Signup successfully!",
      newUser,
      token,
    });
  } catch (error) {
    next(error);
  }
};

// POST /users/login
export const signin = async (req, res, next) => {
  console.log("signin controller");
  try {
    const { email, password } = req.body;

    //1 find a user with given email address
    const user = await User.findOne({ email });

    //2 compare password and hash value
    // const isMatch = await user.authenticate(password);

    //3. send error while email or password is wrong
    if (!user || !(await user.authenticate(password))) {
      throw createError(401, "Invalid Credentials!");
    }
    //remove password from user document before send to client
    user.password = undefined;

    //create JWT
    const token = await createToken(
      { userid: user._id, userrole: user.role },
      process.env.JWT_SECRET
    );

    //set cookie and store jwt token inside it.
    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 48,
      SameSite: `none`,
      secure: false,
      domain: "127.0.0.1",
    });

    //create another cookie (to have multiple cookies - just for test)
    res.cookie("name", user.name);

    //4. if user found by email and password matched with hash value send response
    res.status(200).json({
      message: "Congrats! You logged in successfully!",
      user,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /users/:uid
export const updateUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const { name, email, password, birthdate } = req.body;

    //find user by uid
    const user = await User.findById(uid);

    if (!user) {
      return createError.NotFound("User not found!");
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    user.birthdate = birthdate || user.birthdate;

    await user.save();
    user.password = undefined;
    res.status(200).json({ message: "User updated successfully!", user });
  } catch (error) {
    next(error);
  }
};

// GET /users/:uid/cart
export const getUserCart = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

// GET /users/:uid/orders
export const getUserOrders = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
