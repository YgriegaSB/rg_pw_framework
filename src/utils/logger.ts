import winston from 'winston';
import path from 'path';
import fs from 'fs';

const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const consoleFormat = winston.format.printf(({ level, message, timestamp, projectName }) => {
    const projectTag = projectName ? `[${projectName}]` : '[Global]';
    const paddedProject = projectTag.padEnd(12);

    return `${timestamp} ${paddedProject} ${level}: ${message}`;
});

export const createTestLogger = (testName: string, projectName: string) => {
    const sanitizedName = testName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const logFilename = path.join(logDir, `${sanitizedName}.log`);

    if (fs.existsSync(logFilename)) {
        fs.unlinkSync(logFilename);
    }

    return winston.createLogger({
        level: process.env.LOG_LEVEL || 'info',
        format: winston.format.combine(
            winston.format.timestamp({ format: 'HH:mm:ss' }),
            winston.format.errors({ stack: true })
        ),
        defaultMeta: { testName, projectName },
        transports: [
            new winston.transports.File({
                filename: logFilename,
                format: winston.format.json(),
            }),

            new winston.transports.Console({
                format: winston.format.combine(winston.format.colorize(), consoleFormat),
            }),
        ],
    });
};
