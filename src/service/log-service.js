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
    const logs = await prismaClient.accessLog.findMany({
        orderBy: {
            timestamp: 'desc'
        }
    });

    for (const log of logs) {
        log.readDate = dayjs(log.timestamp).format('D MMMM YYYY')
        log.readTime = dayjs(log.timestamp).format('HH:ss')
    }

    return logs;
};

export default {
    getAccessLog,
    getErrorLog,
    getWebAccessLog
};