import fs from 'fs';
import path from 'path';
import dayjs from 'dayjs';
import axios from 'axios';
import { prismaClient } from '../application/database.js';
import { accessLogValidation } from '../validation/accesslog-validation.js';
import { validate } from '../validation/validation.js';

const accessLogFile = path.join('./log/access.log');
const errorLogFile = path.join('./log/error.log');

const getAccessLog = () => {
    const logFileContent = fs.readFileSync(accessLogFile, { encoding: 'utf-8' });
    const logEntries = logFileContent
        .split('\n')
        .filter((line) => line.trim() !== '')
        .map((line) => JSON.parse(line));
    return logEntries.reverse();
};

const getErrorLog = () => {
    const logFileContent = fs.readFileSync(errorLogFile, { encoding: 'utf-8' });
    const logEntries = logFileContent
        .split('\n')
        .filter((line) => line.trim() !== '')
        .map((line) => JSON.parse(line))
        .reverse();
    for (const log of logEntries) {
        log.readDate = dayjs(log.date).format('D MMMM YYYY');
        log.readTime = dayjs(log.date).format('HH:mm:ss');
    }
    return logEntries;
};

const getWebAccessLog = async () => {
    const log_sessions = await prismaClient.accessLog.groupBy({
        by: ['session'],
        _max: {
            timestamp: true
        },
        _count: {
            _all: true
        },
    });

    for (const session of log_sessions) {
        const lastLog = await prismaClient.accessLog.findFirst({
            orderBy: {
                timestamp: 'desc'
            }
        });

        // ip & location
        session.ip = lastLog.ip || '';
        session.city = lastLog.city || '';
        session.country = lastLog.country || '';
        session.countryCode = lastLog.countryCode || '';

        // timestamp
        session.timestamp = session._max.timestamp;
        session.readDate = dayjs(session.timestamp).format('D MMMM YYYY');
        session.readTime = dayjs(session.timestamp).format('HH:mm');
        session.count = session._count._all;

        delete session._count;
        delete session._max;
    }

    // sort
    log_sessions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return log_sessions;
};

const getWebAccessLogBySession = async (session) => {
    const logs = await prismaClient.accessLog.findMany({
        where: {
            session: session
        },
        orderBy: {
            timestamp: 'desc'
        }
    });

    for (const log of logs) {
        log.readDate = dayjs(log.timestamp).format('D MMMM YYYY');
        log.readTime = dayjs(log.timestamp).format('HH:mm');
    }

    return logs;
};

const createWebAccessLog = async (data) => {
    data = validate(accessLogValidation, data);
    const ip = data.ip;

    const { data: user } = await axios.get('http://ip-api.com/json/' + ip);

    data.country = user.country;
    data.countryCode = user.countryCode;
    data.city = user.city;
    data.lat = user.lat;
    data.lon = user.lon;

    return prismaClient.accessLog.create({ data });
};

export default {
    getAccessLog,
    getErrorLog,
    getWebAccessLog,
    getWebAccessLogBySession,
    createWebAccessLog
};