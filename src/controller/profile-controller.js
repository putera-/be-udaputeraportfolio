import profileService from "../service/profile-service.js"

const getProfile = async (req, res, next) => {
    try {
        const data = await profileService.get();
        res.status(200).json({
            message: 'Success',
            data: data
        })
    } catch (error) {
        next(error)
    }
}

export default {
    getProfile
}