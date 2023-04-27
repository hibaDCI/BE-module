import jwt from 'jsonwebtoken';
import { verifyToken } from '../utils/jwt.js';
import { User } from '../models/users.js';
import createError from 'http-errors';


//middleware function to protect routes by verifying tokens
export const protect = function () {
    return async (req, res, next) => {
        try {
            //get the token
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.startsWith('Bearer') && authHeader.split(' ')[1];

            if (!token) {
                return createError(401, 'Token Not Found!')
            }


            //verify it
            const decoded = await verifyToken(token, process.env.JWT_SECRET)
            console.log('decoded:', decoded);

            /* ------------- if user deleted after issue the token ------------ */
            const user = await User.findById(decoded.userid);
            if (!user) {
               throw createError(401, 'The user belongs to given token is deleted recently!');
            }

            /* ------- if user change the password after issue the token ------ */
            //1. track last time password changed on db
            //2. compare password last change date with issue date of token
            //3. if issue date of token is older than password change date return error

            next()
        } catch (error) {
            next(error)
        }
    }
}