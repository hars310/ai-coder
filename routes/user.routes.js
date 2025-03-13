import express from "express";
const router = express.Router();
import * as userController from "../backend/controllers/user.controller.js";
import * as authMiddleware from "../backend/middlewares/auth.middleware.js";
import { body } from "express-validator";

// this route is used to register a user
router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  userController.createUserController
);

// this route is used to login a user
router.post(
  "/login",
  body("email").isEmail().withMessage("Please enter a valid email."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  userController.loginUserController
);

// profile controller
router.get(
  "/profile",
  authMiddleware.authUser,
  userController.profileController
);

router.get("/logout",authMiddleware.authUser, userController.logoutController);

export default router;
