import express from "express";
import { getAllAuthors } from "../controllers/authors.js";
const router = express.Router();

router.route('/')
    .get(getAllAuthors);



export default router;