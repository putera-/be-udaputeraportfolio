import authService from "../service/auth-service.js"

const login = async (req, res, next) => {
    try {
        const data = await authService.login(req.body, res);

        res.status(200).json({ data });
    } catch (error) {
        next(error)
    }
}

const logout = async (req, res, next) => {
    try {
        await authService.logout(req.user.email);

        // generate the token tobe 1 second expired
        authService.create_token(req.user.email, '1s');

        // clear cookie
        res.clearCookie('token');

        res.status(200).json({ success: true });
    } catch (error) {
        next(error)
    }
}

export default {
    login,
    logout
}