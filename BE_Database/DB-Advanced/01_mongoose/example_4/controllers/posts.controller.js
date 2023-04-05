import createError from 'http-errors';
import { User } from "../models/users.model.js";
import { Post } from "../models/posts.model.js";


/* ------------------------- get all Posts ------------------------ */
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({author: req.params.uid}).populate('author');
    res.status(200).json({ message: "get posts successful", posts });

  } catch (error) {
    next(error);
  }
};

/* ------------------------- add new todo ------------------------- */
export const addNewPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const { uid } = req.params;

    //find the user by id
    const user = await User.findById(uid);
    if (!user) {
      throw createError.NotFound('User not found!');
    }

    //create a document for a post
    const newPost = new Post({ title, content, author: user._id });
    //add id of this post into user's document
    user.posts.push(newPost._id);
    await newPost.save();
    await user.save();

    res.status(200).json({
      message: "New Post added successfully!",
      user, newPost
    });
  } catch (error) {
    next(error);
  }
};
