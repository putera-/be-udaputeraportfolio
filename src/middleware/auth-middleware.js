import { prismaClient } from '../application/database.js';
import authService from '../service/auth-service.js';

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        // check token
        if (!token) throw new Error();

        const user = await prismaClient.user.findFirst({
            where: { token },
            select: {
                name: true,
                email: true
            }
        });

        if (!user) throw new Error();

        // validate token & save token
        const verified = authService.verify_token(res, token);
        if (!verified) throw new Error();

        // add user to request
        req.user = user;

        next();
    } catch (error) {
        res.clearCookie('token');
        return res.status(401).json({
            errors: 'Unauthorized'
        });
    }
};