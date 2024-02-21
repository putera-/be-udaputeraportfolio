import logService from '../service/log-service.js';

const getWebAccessLog = async (req, res, next) => {
    try {
        const data = await logService.getWebAccessLog();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const getAccessLog = (req, res, next) => {
    try {
        const data = logService.getAccessLog();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const getErrorLog = (req, res, next) => {
    try {
        const data = logService.getErrorLog();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

export default {
    getWebAccessLog,
    getAccessLog,
    getErrorLog
};