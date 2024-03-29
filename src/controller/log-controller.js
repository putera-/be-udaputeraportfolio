import logService from '../service/log-service.js';

const getWebAccessLog = async (req, res, next) => {
    try {
        const data = await logService.getWebAccessLog();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const getWebAccessLogBySession = async (req, res, next) => {
    try {
        const data = await logService.getWebAccessLogBySession(req.params.session);

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

const createWebAccessLog = async (req, res, next) => {
    try {
        const data = await logService.createWebAccessLog(req.body);

        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
};

export default {
    getWebAccessLog,
    getWebAccessLogBySession,
    getAccessLog,
    getErrorLog,
    createWebAccessLog
};