import fs from 'fs';
import readline from 'readline';
import path, { dirname } from "path";
import { fileURLToPath } from "url";


const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);
const accessLogFile = path.join(__dirname, '../../log/access.log');
const errorLogFile = path.join(__dirname, '../../log/error.log');


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
}