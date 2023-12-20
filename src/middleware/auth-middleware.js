import { prismaClinet } from "../application/database.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({
            errors: 'Unauthorized'
        }).end();
    } else {
        const user = await prismaClinet.user.findFirst({
            where: {
                token: token
            }
        });

        if (!user) {
            res.status(401).json({
                errors: 'Unauthorized'
            }).end();
        } else {
            req.user = user;
            next();
        }
    }
}