import express from 'express'

const router = express.Router();

import  * as userController from "../controllers/user.controller.js";
import { body } from 'express-validator';


// this route is used to register a user
router.post('/register',
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    userController.createUserController); 

export default router
