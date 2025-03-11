import userModel from '../models/user.model.js';
import {hashPassword} from '../utils/user/hashPassword.js';

export  async function createUser({username, email , password}) {  
    if(!email || !password){
        throw new Error('Email and Password are required')
    }

    // this hashes the user password to protect it from being stored in plain text
    const hashedPassword = await hashPassword(password);

    const user =  await userModel.create(
        {
            username,
            email, 
            password: hashedPassword
        });

    return user;

}