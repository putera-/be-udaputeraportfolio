import { prismaClient } from "../application/database.js";
import authService from "../service/auth-service.js"

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({
            errors: 'Unauthorized'
        }).end();
    } else {
        const user = await prismaClient.user.findFirst({
            where: { token },
            select: {
                name: true,
                email: true
            }
        });

        if (!user) {
            res.status(401).json({
                errors: 'Unauthorized'
            }).end();
        } else {
            // validate token & save token
            authService.verify_token(res, token);

            // add user to request
            req.user = user;

            next();
        }
    }
}