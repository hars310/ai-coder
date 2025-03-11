import jwt from 'jsonwebtoken';

// Function to create JWT Token
export async function createJwtToken (email){
    return await jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
};
