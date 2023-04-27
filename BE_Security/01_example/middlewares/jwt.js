import { User } from "../models/users.js";
import { verifyToken } from "../utils/jwt.js";
import createError from "http-errors";

export function authToken() {
  return async (req, res, next) => {
    try {
      /* ----------- 1- Getting token and check if it's there ---------------- */
      //read authorization header from request object
      const authHeader = req.headers["authorization"];

      //extract token
      const token =
        authHeader &&
        authHeader.startsWith("Bearer") &&
        authHeader.split(" ")[1];

      if (!token) {
        return createError(401, "Token Not Found!");
      }

      /* --------------------- 2- Verification token ------------------------- */
      //verify token by using verifyToken function created above
      const decoded = await verifyToken(token);

      /* ----------------- 3- Check if user still exists --------------------- */
      const freshUser = await User.findById(decoded.userid);
      if (freshUser) {
        return createError(401, "The user belonging to this token, not exist!");
      }
      /* ---- 4- check if user changed password after the token was issued ---- */
      if (freshUser.changedPasswordAfter(decoded.iat)) {
        return createError(
          401,
          "User recently changed password! Please login again."
        );
      }
      return next();
    } catch (error) {
      next(error);
    }
  };
}
