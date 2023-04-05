import User from '../models/users.model.js'
import Task from '../models/tasks.model.js'
import createError from 'http-errors';

/* ------------------------- get all todos ------------------------ */
// export const getAllTodos = async (req, res, next) => {
//   try {
//     res
//       .status(200)
//       .json({ message: "get users successful", users: db.data.todos });
//   } catch (error) {
//     next(error);
//   }
// };


/* ------------------------- add new todo ------------------------- */
export const addNewTask = async (req, res, next) => {
  try {
    
    const { title, deadline, desc, status } = req.body;

    //find the user by assignee id come from req.body
    const user = await User.findById(req.params.id);
    if (!user) {
      throw createError.NotFound('User not found!');
    }

    //create a document for a task
    const newTask = await Task.create({ title, deadline, status, desc, assignee: user });

    res.status(200).json({
      message: "New Task added successfully!",
      newTask,
    });

  } catch (error) {
    next(error);
  }
};


/* ------------------------ get user by id ------------------------ */
// export const getTodoById = async (req, res, next) => {
//   try {
//     //read and evaluate userid from url
//     const tid = parseInt(req.params.id);
//     if (isNaN(tid)) {
//       return next(createError(400, "Todo id must be a number! 🚨"));
//     }

//     const foundTodo = db.data.todos.find((todo) => todo.id === tid);
//     if (!foundTodo) {
//       return next(createError(404, "There is no user for given user-id! 🚨"));
//     }

//     res.status(200).json({
//       message: "found todo successful!",
//       todo: foundTodo,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

/* ----------------------- update user by id ---------------------- */
// export const updateTodo = async (req, res, next) => {
//   try {
//     const tid = parseInt(req.params.id);
//     if (isNaN(tid)) {
//       return next(createError(400, "Todo id must be a number! 🚨"));
//     }

//     const tIndex = db.data.todos.findIndex((todo) => todo.id === tid);
//     if (tIndex === -1) {
//       return next(createError(404, "There is no todo with given todo-id! 🚨"));
//     }
//     //update user in db
//     db.data.todos[tIndex] = { ...db.data.todos[tIndex], ...req.body };
//     await db.write();

//     res.status(200).json({
//       message: "update successful!",
//       todo: db.data.todos[tIndex],
//     });
//   } catch (error) {
//     next(error);
//   }
// };


/* ----------------------- delete todo by id ---------------------- */
// export const deleteTodo = async (req, res, next) => {
//   try {
//     //read and assess uid from url
//     const tid = parseInt(req.params.id);
//     if (isNaN(tid)) {
//       return next(createError(400, "Todo id must be a number! 🚨"));
//     }

//     //find index of user with given tid
//     const tIndex = db.data.todos.findIndex((todo) => todo.id === tid);
//     if (tIndex === -1) {
//       return next(createError(404, "There is no todo with given todo-id! 🚨"));
//     }

//     //delete user from db
//     db.data.users.splice(tIndex, 1);
//     await db.write();

//     res.status(200).json({
//       message: `todo ${tid} deleted successfully!`,
//     });
//   } catch (error) {
//     next(error);
//   }
// };