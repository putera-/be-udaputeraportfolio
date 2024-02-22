import fs from 'fs';
import path from 'path';
import { prismaClient } from '../application/database.js';
import dayjs from 'dayjs';

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
        .map((line) => JSON.parse(line));
    return logEntries.reverse();
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
        const logs = await prismaClient.accessLog.findMany({
            where: {
                session: session.session
            },
            orderBy: {
                timestamp: 'desc'
            }
        });

        for (const log of logs) {
            log.readDate = dayjs(log.timestamp).format('D MMMM YYYY');
            log.readTime = dayjs(log.timestamp).format('HH:mm');
        }

        session.logs = logs;


        // ip & location
        session.ip = logs.length ? logs[0].ip : '';
        session.city = logs.length ? logs[0].city : '';
        session.country = logs.length ? logs[0].country : '';
        session.countryCode = logs.length ? logs[0].countryCode : '';

        // timestamp
        session.timestamp = session._max.timestamp;
        session.readDate = dayjs(session.timestamp).format('D MMMM YYYY');
        session.readTime = dayjs(session.timestamp).format('HH:mm');
        session.count = session._count._all;

        delete session._count;
        delete session._max;
    }

    return log_sessions;
};

export default {
    getAccessLog,
    getErrorLog,
    getWebAccessLog
};