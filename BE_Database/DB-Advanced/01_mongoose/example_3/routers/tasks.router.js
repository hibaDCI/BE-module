import express from "express";
import { addNewTask } from "../controllers/tasks.controller.js";
export const todoRouter = express.Router();

// todoRouter.route('/')
//     .get(getAllTodos)

todoRouter.route('/:id')
    .post(addNewTask)
    // .get(getTodoById)
    // .put(updateTodo)
    // .delete(deleteTodo)