import morgan from "morgan";
import rfs from 'rotating-file-stream';
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import requestIp from "request-ip";
import authService from "../service/auth-service.js";

// log format
const log_format = '{"user":":user", "ip-addr":":ip-addr","method":":method","url":":url","date":":date","http-version":"HTTP/:http-version","status": ":status","response-time":":response-time ms","content-length":":res[content-length]","referer":":referrer","user-agent":":user-agent"}';
const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

const log_path = path.join(__dirname, '../../log');

// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: log_path
});

var errorLogStream = rfs.createStream('error.log', {
    interval: '1d', // rotate daily
    path: log_path
});

// log success access
const accessLogger = morgan(log_format, {
    skip: (req, res) => res.statusCode > 400,
    stream: accessLogStream
});

// log only 4xx and 5xx
const errorLogger = morgan(log_format, {
    skip: (req, res) => res.statusCode < 400,
    stream: errorLogStream
});

const setUserLog = (req, res, next) => {
    const ip = requestIp.getClientIp(req);
    morgan.token('user', () => authService.get_user_by_token(req));
    morgan.token('ip-addr', () => ip);
    next();
};

export {
    accessLogger,
    errorLogger,
    setUserLog
};