import express from "express";
import cookieParser from "cookie-parser";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { apiRouter } from "../route/api.js";
import { notFound } from "../middleware/notfound-middleware.js";

export const app = express();

app.use(express.json());
app.use(cookieParser())

app.use(publicRouter);
app.use(apiRouter);
app.use(notFound);

// handle error
app.use(errorMiddleware);