import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export const createToken = async (payload) => {
    const asyncSign = promisify(jwt.sign);
    return await asyncSign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
}

export const verifyToken = async (token, secret) => {
    const asyncVerify = promisify(jwt.verify);
    return await asyncVerify(token, secret);
}