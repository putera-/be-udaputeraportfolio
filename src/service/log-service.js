import fs from 'fs';
import path from 'path';

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

export default {
    getAccessLog,
    getErrorLog
};