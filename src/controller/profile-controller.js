import profileService from '../service/profile-service.js';

const get = async (req, res, next) => {
    try {
        const data = await profileService.get();
        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        // if (req.file) {
        // req.body.avatar = req.file.path.replaceAll('\\', '/');
        // }
        const data = await profileService.update(req.body);

        res.status(200).json({ data });
    } catch (error) {
        // remove avatar if failed
        next(error);
    }
};

export default {
    get,
    update
};