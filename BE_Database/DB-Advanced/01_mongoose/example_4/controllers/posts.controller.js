import createError from "http-errors";
import { User } from "../models/users.model.js";
import { Post } from "../models/posts.model.js";


// POST /users/:uid/posts
export const addPost = async (req, res, next) => {
  try {
    //get uid
    const { uid } = req.params;
    const { title, content } = req.body;

    //check if uid is valid
    const user = await User.findById(uid);

    //if uid not valid return error
    if (!user) {
      throw createError.NotFound("User not found!");
    }

    //create a post
    const newPost = await Post.create({ title, content, author: user._id });

    //send response
    res.status(201).json({
      message: "New Post created!",
      newPost,
    });
  } catch (error) {
    next(error);
  }
};

// GET  /users/:uid/posts
export const allPostOfUser = async (req, res, next) => {
  try {
    //read the uid
      const { uid } = req.params;

    //find the user
      const user = await User.findById(uid);

    //if uid invalid throw error
      if (!user) {
          throw createError.NotFound('The given uid is invalid!')
      }

    //find all post with author user._id
      const posts = await Post.find({author: user._id})

    //send response
    res.status(201).json({
      message: `All post of ${user.name}`,
      posts,
    });
      
  } catch (error) {
    next(error);
  }
};


//GET /posts
export const allPostWithTheirAuthor = async (req, res, next) => {
    try {
        const posts = await Post.find().populate('author', {name: 1,email: 1,  _id: 0})
        res.status(200).json({
            message: "list of posts with author id",
            posts
        })
    } catch (error) {
        next(error)
    }
};