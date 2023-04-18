import createError from "http-errors";
import { User } from "../models/users.model.js";
import { Post } from "../models/posts.model.js";
import { Comment } from '../models/comments.model.js';


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
        const posts = await Post.find().populate('author', {name: 1,email: 1,  _id: 0}).gt('likes', 50000).limit(5)
        res.status(200).json({
            message: "list of posts with author id",
            posts
        })
    } catch (error) {
        next(error)
    }
};



export const deletePostById = async (req, res, next) => {
  try {
    //1. find post by pid
    const { pid } = req.params;
    const blogpost = await Post.findById(pid);

    //2. show an err if pid is invalid
    if (!blogpost) {
      throw createError.NotFound('There is no post for the given pid');
    }

    //3. delete all related comments
    const del_comment_result = await Comment.deleteMany({post: blogpost._id})

    //4. delete the post with given pid
    const del_post_result = await Post.findByIdAndRemove(blogpost._id);

    //5. send a response
    res.status(200).json({
      message: "Post deleted successfully!",
      del_comment_result,
      del_post_result
    })

  } catch (error) {
    next(error)
  }
};


// GET /posts/:pid
export const getPostByIdPlusAuthor = async (req, res, next) => {
  try {
    
    //1. get id from params
    const postid = req.params.pid;

    //2. find related post
    const postData = await Post.findById(postid)
      .populate('author', 'name email -_id')
      .select('title content -_id')
      .exec();

    //3. if there is no post return error
    if (!postData) {
      throw createError.NotFound('There is no post for given pid');
    }

    //4. if there is a post send info to frontend
    res.status(200).json({
      message: "get post successfully!",
      post: postData
    })

  } catch (error) {
    next(error)
  }
};


// GET /posts/authors/:authors    /posts/authors/3842938472398,394824982039482309,34928409234082934820
//return list of all posts for the given set of authors
export const getAllPostsByAuthors = async (req, res, next) => {
  try {
    //1. get author ids from params
    const authors = req.params.authors.split(',');

    //2. retreive all post that author is in list of author ids
    const posts = await Post.find().populate('author', 'name').where('author').in(authors).sort('-likes title');

    //3. send response
    res.status(200).json({
      message: 'list of posts for give list of authors',
      authors,
      posts
    })

  } catch (error) {
    next(error);
  }
};