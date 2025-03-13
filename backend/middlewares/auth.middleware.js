import jwt from 'jsonwebtoken';
import redisClient from '../services/redis.service.js';

export async function authUser(req, res, next){
  try {
    let token = req.header("Authorization");

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized! No token provided." });
    }

    token = token.split(" ")[1]; // Extract the token from "Bearer <TOKEN>"

    const isBlacklisted = await redisClient.get(token);
    if (isBlacklisted) {
        res.cookies('token', '');
      return res.status(401).json({ message: "Token is invalid. Please login again." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token. Please login again." });
  }
}
