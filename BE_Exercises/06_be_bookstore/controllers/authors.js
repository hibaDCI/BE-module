import { Author } from "../models/authors.js"


export const getAllAuthors = async (req, res, next) => {
    try {
        const authors = await Author.find().select('name email');
        res.status(200).json({message: 'authors list', authors})
    } catch (error) {
        next(error)
    }
}