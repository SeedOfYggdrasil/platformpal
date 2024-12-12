// ../backend/src/server.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import router from './routes/router.js';
import { Server } from 'socket.io';
import winston from 'winston';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

dotenv.config();

const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.Console()
    ]
});

app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(',') || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } }));

app.use('/api', router);
// app.use('/build', express.static(path.resolve(../../frontend/dist')));
app.get('/check', (req, res) => res.send('Server is operational.'));
app.get('/status', (req, res) => res.status(200).json({ status: 'UP' }));

const port = process.env.SERVER_PORT || 5000;
const host = process.env.SERVER_HOST || 'localhost';

const server = app.listen(port, '0.0.0.0', () => logger.info(`SERVER LIVE: http://${host}:${port}`));

const io = new Server(server);
io.on('connection', (socket) => logger.info('A client connected.'));
export const emitProgress = (progress) => io.emit('progress', progress);

const gracefulShutdown = () => {
    logger.info('Shutting down server...');
    server.close(() => {
        logger.info('Server closed.');
        process.exit(0);
    });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

process.on('uncaughtException', (err) => {
    logger.error(`Uncaught Exception: ${err.message}`);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

