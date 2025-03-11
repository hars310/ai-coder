import mongoose from 'mongoose' 
import bcrypt from 'bcrypt' 

const userSchema = new mongoose.Schema({
     username: {
         type: String,
         required: 'Name is required'
     },
    email: {
        type: String,
        required: 'Email is required',
        unique: true,
        trim: true,
        lowercase: true,
        minLength: [6,"Email must be at least 6 characters"],
        maxLength: [200,"Email must be at most 200 characters"],
        match: [/.+\@.+\..+/,"Please fill a valid email address"]
    },
    password: {
        type: String,
        select: false,
        required: 'Password is required',
        // minLength: [6,"Password must be at least 6 characters"],
    },
})

const User =  mongoose.model('User',userSchema) 

export default User