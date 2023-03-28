import express from "express";
import { addNewTodo, deleteTodo, getAllTodos, getTodoById, updateTodo } from "../controllers/todos.controller.js";
export const todoRouter = express.Router();

todoRouter.route('/')
    .get(getAllTodos)

todoRouter.route('/:id')
    .get(getTodoById)
    .post(addNewTodo)
    .put(updateTodo)
    .delete(deleteTodo)