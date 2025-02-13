import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Jwt } from '../../common/types/jwt';
import usersService from '../../users/services/users.service';

if (!process.env.JWT_SECRET) {
    throw new Error('Missing environment variable: JWT_SECRET');
}
const jwtSecret: string = process.env.JWT_SECRET;

class JwtMiddleware {
    verifyRefreshBodyField(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): void {
        if (req.body && req.body.refreshToken) {
            next();
        } else {
            res.status(400).send({ errors: ['Missing required field: refreshToken'] });
        }
    }

    async validRefreshNeeded(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> {
        const user: any = await usersService.getUserByEmailWithPassword(res.locals.jwt.email);
        
        if (!user) {
            res.status(404).send({ errors: ['User not found'] });
            return;
        }
        
        if (!res.locals.jwt.refreshKey) {
            res.status(400).send({ errors: ['Missing refresh key'] });
            return;
        }
        
        try {
            const salt = crypto.createSecretKey(Buffer.from(res.locals.jwt.refreshKey.data));
            const hash = crypto
                .createHmac('sha512', salt)
                .update(res.locals.jwt.userId + jwtSecret)
                .digest('base64');
            
            if (hash === req.body.refreshToken) {
                req.body = {
                    userId: user._id,
                    email: user.email,
                    permissionFlags: user.permissionFlags,
                };
                next();
            } else {
                res.status(400).send({ errors: ['Invalid refresh token'] });
            }
        } catch (error) {
            res.status(500).send({ errors: ['Error processing refresh token'] });
        }
    }

    validJWTNeeded(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): void {
        if (!req.headers['authorization']) {
            res.status(401).send({ errors: ['Authorization header missing'] });
            return;
        }

        const authorization = req.headers['authorization'].split(' ');
        if (authorization.length !== 2 || authorization[0] !== 'Bearer') {
            res.status(401).send({ errors: ['Invalid authorization format'] });
            return;
        }

        try {
            res.locals.jwt = jwt.verify(authorization[1], jwtSecret) as Jwt;
            next();
        } catch (err) {
            res.status(403).send({ errors: ['Invalid or expired token'] });
        }
    }
}

export default new JwtMiddleware();