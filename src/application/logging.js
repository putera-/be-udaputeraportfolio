import winston from 'winston';
// import MySQLTransport from 'winston-mysql/lib/mysql_transport.js';

const options_default = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA,
    table: process.env.DB_TABLE
};

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        // new winston.transports.Console({}),
        // new MySQLTransport(options_default),
    ]
});