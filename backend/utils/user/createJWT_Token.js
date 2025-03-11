import jwt from "jsonwebtoken";

// Function to create JWT Token
export async function createJwtToken(user) {
  return await jwt.sign(
    { id: user._id, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
}
