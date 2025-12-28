import { test as baseTest } from '@playwright/test';
import { createTestLogger } from '@utils/logger';
import winston from 'winston';
import path from 'path';
import fs from 'fs';

type TestFixtures = {
    logger: winston.Logger;
};

export const test = baseTest.extend<TestFixtures>({
    logger: async ({ }, use, testInfo) => {
        const logger = createTestLogger(testInfo.title, testInfo.project.name);

        logger.info(`INICIO DEL TEST: ${testInfo.title}`);

        await use(logger);

        logger.info(`FIN DEL TEST: ${testInfo.title} - STATUS: ${testInfo.status}`);

        await new Promise(resolve => setTimeout(resolve, 100));

        const sanitizedName = testInfo.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const logPath = path.join(process.cwd(), 'logs', `${sanitizedName}.log`);

        if (fs.existsSync(logPath)) {
            await testInfo.attach('Execution Logs', {
                path: logPath,
                contentType: 'application/json'
            });
        }
    },
});

export { expect } from '@playwright/test';
