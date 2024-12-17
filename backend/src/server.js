// ../backend/src/server.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import winston from 'winston';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import path from 'path';
import router from './routes/router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Environmental Variables
dotenv.config();
const corsOrigins = process.env.CORS_ORIGINS?.split('.') || '*'
const port = process.env.SERVER_PORT || 5000;
const host = process.env.SERVER_HOST || 'localhost';

// Logs
const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.Console()
    ]
});

// CORS
const corsOptions = {
  origin: corsOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
};

// Rate-Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } }));

// Debugging
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

// API Routes
app.use('/api', router);

// Static Frontend Build
app.use(
  express.static(path.join(__dirname, "..", "..", "frontend", "dist"), {
    maxAge: "1d",
  })
);

// Fallback to Frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "frontend", "dist", "index.html"), {
    cacheControl: true,
  });
});

// Start Server
const server = app.listen(port, '0.0.0.0', () =>
logger.info(`SERVER LIVE: http://${host}:${port}`
));

const io = new Server(server, {
	cors: {
		origin: corsOrigins,
	},
});

io.on('connection', (socket) => logger.info('A client connected.'));
export const emitProgress = (progress) => io.emit('progress', progress);



// Alternate Server Config

//import { createServer } from 'http';
//const httpServer = createServer(app);
//const io = new Server(httpServer, {
//   cors: {
//     origin: corsOrigins,
//   },
//});
//httpServer.listen(port, () => {
//  logger.info(`Server is listening on port ${port}`);
//});



// Graceful Shutdown
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

