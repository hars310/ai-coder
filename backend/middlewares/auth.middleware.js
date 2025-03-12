import jwt from 'jsonwebtoken';
import redisClient from '../services/redis.service.js';

export async function authUser(req, res, next){
    try {
        const token = req.cookies.token || req.header('Authorization').split(' ')[1];
        // console.log(token)
        if(!token) return res.status(401).json({message:"Please authenticate first 1 "}); 

        const isBlacklisted = await redisClient.get(token);
        // console.log(isBlacklisted)
        if(isBlacklisted) {
            res.cookies('token', '');
            return res.status(401).json({message:"Please authenticate first"});
        }

        // this will decode the token and get the user
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded)

        // this will add the user to the request object
        req.user = decoded;

        // this will allow the user to access the next route
        next()
    } catch (error) {
        res.status(401).json({message:"Please authenticate first 2"});
    }
}