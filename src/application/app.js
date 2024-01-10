import express from 'express';
import cookieParser from 'cookie-parser';
import { publicRouter } from '../route/public-api.js';
import { errorMiddleware } from '../middleware/error-middleware.js';
import { apiRouter } from '../route/api.js';
import { notFound } from '../middleware/notfound-middleware.js';
import { accessLogger, errorLogger, setUserLog } from '../middleware/log-middleware.js';
import cors from 'cors';

export const app = express();

app.use(express.json());
app.use(cookieParser());

// cors
if (process.env.NODE_ENV == 'development') {
    console.log('set cors development');
    app.use(cors({
        origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3003'],
        credentials: true
    }));
} else if (process.env.NODE_ENV == 'production') {
    app.use(cors({
        origin: [process.env.APP_WEB_URL],
        credentials: true
    }));
}

// set morgan user
app.use(setUserLog);
app.use(errorLogger);
app.use(accessLogger);

app.use(publicRouter);
app.use(apiRouter);

// error middleware
app.use(notFound);
app.use(errorMiddleware);