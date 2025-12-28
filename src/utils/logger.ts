import winston from 'winston';
import path from 'path';
import fs from 'fs';

const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const consoleFormat = winston.format.printf(({ level, message, timestamp, context }) => {
    const contextMsg = context ? ` [${context}]` : '';
    return `${timestamp} ${level.toUpperCase()}:${contextMsg} ${message}`;
});

export const createTestLogger = (testName: string) => {
    const sanitizedName = testName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const logFilename = path.join(logDir, `${sanitizedName}.log`);

    if (fs.existsSync(logFilename)) {
        fs.unlinkSync(logFilename);
    }

    return winston.createLogger({
        level: process.env.LOG_LEVEL || 'info',
        format: winston.format.combine(
            winston.format.timestamp({ format: 'HH:mm:ss' }),
            winston.format.errors({ stack: true }),
            winston.format.json()
        ),
        defaultMeta: { testName },
        transports: [
            new winston.transports.File({ filename: logFilename }),

            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    consoleFormat
                )
            })
        ]
    });
};
