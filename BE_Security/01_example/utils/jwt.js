import jwt from "jsonwebtoken";
import { promisify } from "util";

//create a new token
export async function createToken(payload) {
  const signAsync = promisify(jwt.sign);
  return await signAsync(payload, process.env.JWT_SECRET, {expiresIn: '30d'});
}


//verify the given token
export async function verifyToken(token) {
    const verifyAsync = promisify(jwt.verify);
    return await verifyAsync(token, process.env.JWT_SECRET);
}


