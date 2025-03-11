import express from 'express'

const router = express.Router();

import  * as userController from "../controllers/user.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import { body } from 'express-validator';


// this route is used to register a user
router.post('/register',
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    userController.createUserController); 

// this route is used to login a user
router.post('/login',
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    userController.loginUserController);

// profile controller
router.get('/profile',authMiddleware.authUser, userController.profileController);

export default router
