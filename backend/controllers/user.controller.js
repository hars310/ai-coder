import userModel from '../models/user.model.js';
import * as userService from '../services/user.service.js';
import {validationResult} from 'express-validator';
import { createJwtToken } from '../utils/user/createJWT_Token.js';

 export async function createUserController(req,res){

    // this checks for any validation errors in the request body
    // if there are any errors it will return a 400 status code with the errors
    // if there are no errors it will continue to the next line
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const user = await userService.createUser(req.body);

        // this creates a jwt token for the user
        const token = await createJwtToken(user.email);

        res.status(201).json({user,token});
    }catch(err){
        res.status(400).json({message:err.message});
    }

}

