import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '@/app/models/user';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

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

export const decodeToken = (token: string): User | string => {
    return jwt.verify(token, jwtSecret) as User;
}

export const authenticateByCookies = (cookies: ReadonlyRequestCookies): User | false => {
    if (!cookies.has('token')) {
        return false;
    }

    const token = cookies.get('token')?.value;

    if (!token) {
        return false;
    }

    const user = decodeToken(token) as User | string;
    return typeof user === 'string' ? false : user;
}