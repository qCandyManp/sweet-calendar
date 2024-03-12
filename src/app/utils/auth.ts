import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '@/app/models/user';

const jwtSecret = process.env.JWT_SECRET as jwt.Secret;

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

export const comparePassword = (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
}

export const generateToken = (user: User): string => {
    return jwt.sign(user, jwtSecret, {
        expiresIn: '30d'
    });
}

export const verifyToken = (token: string): User | string => {
    return jwt.verify(token, jwtSecret) as User;
}