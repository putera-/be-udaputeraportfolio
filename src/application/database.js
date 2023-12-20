import { PrismaClient } from "@prisma/client";
import { logger } from "./logging.js";

export const prismaClinet = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'error',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
    ],
});

prismaClinet.$on('query', e => {
    logger.info(e);
});

prismaClinet.$on('error', e => {
    logger.error(e);
});

prismaClinet.$on('warn', e => {
    logger.warn(e);
});

prismaClinet.$on('info', e => {
    logger.info(e);
});