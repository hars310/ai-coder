import userModel from "../models/user.model.js";
import * as userService from "../services/user.service.js";
import { validationResult } from "express-validator";
import { createJwtToken } from "../utils/user/createJWT_Token.js";
import { comparePassword } from "../utils/user/hashAndComparePassword.js";

function checkValidationErrors(req) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return;
}

export async function createUserController(req, res) {
  // this checks for any validation errors in the request body
  // if there are any errors it will return a 400 status code with the errors
  // if there are no errors it will continue to the next line
  checkValidationErrors(req);

  try {
    const user = await userService.createUser(req.body);
    // console.log(user)

    // this creates a jwt token for the user
    const token = await createJwtToken(user);

    res.status(201).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function loginUserController(req, res) {
  checkValidationErrors(req);

  try {
    const { email, password } = req.body;

    // in our user model we have selected password to be false
    // so we need to select it here to be able to compare the password
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // this compares the password in the request body
    // with the password in the database
    const comparePass = await comparePassword(password, user.password);

    if (!comparePass) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // this creates a jwt token for the user
    // console.log(user)
    const token = await createJwtToken(user);

    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function profileController(req, res) {
  checkValidationErrors(req);
  try {
    const user = req.user;
    // console.log(user)
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
