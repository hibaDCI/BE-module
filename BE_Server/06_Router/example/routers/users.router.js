import express from 'express';
import {
  login,
  register,
  updateProfile,
} from "../controllers/users.controller.js";


//create a router
const router = express.Router();


/** USER ROUTES */
//login
router.post('/login', login);

//register
router.post('/register', register);

//update Users Profile
router.put('/profile/:uid', updateProfile);


export default router;