import createError from "http-errors";
import { Post } from "../models/posts.model.js";
import { User } from "../models/users.model.js";
import { Comment } from "../models/comments.model.js";

//POST /users/:uid/posts/:pid/comments
export const addComment = async (req, res, next) => {
    try {
        
        //get userid and postid from params
        const { uid, pid } = req.params;
        const { content } = req.body;

        //check if userid and postid are valid
        const user = await User.findById(uid);
        const post = await Post.findById(pid);

        //if one of them is invalid return error
        if (!user || !post) {
            throw createError.NotFound('User or Post id is invalid!')
        }

        //create comment
        const newComment = await Comment.create({ content, author: user._id, post: post._id });
        
        //send response
        res.status(201).json({
            message: "comment added!",
            newComment
        })


    } catch (error) {
        next(error)
    }
}


//GET /users/:uid/posts/:pid/comments
export const allCommentForPost = async (req, res, next) => {
    try {
        
        //get userid and postid from params
        const { uid, pid } = req.params;
       

        //check if userid and postid are valid
        const user = await User.findById(uid);
        const post = await Post.findById(pid);

        //if one of them is invalid return error
        if (!user || !post) {
            throw createError.NotFound('User or Post id is invalid!')
        }

        //find all comments for give uid and pid
        const comments = await Comment.find({author: user._id, post: post._id})
        
        //send response
        res.status(201).json({
            message: `all comment for post #${post._id} of user ${user.name}`,
            comments
        })


    } catch (error) {
        next(error)
    }
}


//GET /posts/:pid/comments
export const allComForSinglePost = async (req, res, next) => {
    try {
        
        //get postid from params
        const { pid } = req.params;
       

        //check if  postid is valid
        const post = await Post.findById(pid);

        //if one of them is invalid return error
        if (!post) {
            throw createError.NotFound('Post id is invalid!')
        }

        //find all comments for give pid
        const comments = await Comment.find({ post: post._id}).populate('author')
        
        //send response
        res.status(201).json({
            message: `all comment for post #${post._id}`,
            comments
        })


    } catch (error) {
        next(error)
    }
}



