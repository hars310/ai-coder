import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();



function dbconnection(){
    mongoose.connect(process.env.MONGO_DB_URI)
    .then(()=>{
        console.log("MongoDB connected");
    }).catch((err)=>{
        console.log(err);
    });
}


export default dbconnection;