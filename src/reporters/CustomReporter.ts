import type {
    Reporter,
    TestCase,
    TestResult,
    FullResult,
    FullConfig,
    Suite,
    TestStep,
} from '@playwright/test/reporter';
import { createTestLogger } from '@utils/logger';

const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m',
    bold: '\x1b[1m',
    gray: '\x1b[90m',
};

class CustomReporter implements Reporter {
    private testResults: { title: string; status: string; duration: number; project: string }[] = [];
    private logger = createTestLogger('CustomReporter', 'Global');

    onBegin(config: FullConfig, suite: Suite) {
        this.logger.info(
            `${colors.cyan}${colors.bold}Starting the run with ${suite.allTests().length} tests.${colors.reset}`
        );
    }

    onTestBegin(test: TestCase, result: TestResult) {
        const projectName = test.parent.project()?.name || 'Global';
        this.logger.info(`Starting test: ${test.title}`, { projectName });
    }

    onStepBegin(test: TestCase, result: TestResult, step: TestStep) {
        if (step.category === 'test.step') {
            const projectName = test.parent.project()?.name || 'Global';
            this.logger.info(`${colors.gray}  → Starting step: ${step.title}${colors.reset}`, { projectName });
        }
    }

    onStepEnd(test: TestCase, result: TestResult, step: TestStep) {
        if (step.category === 'test.step') {
            const projectName = test.parent.project()?.name || 'Global';
            const duration = step.duration;
            const statusIcon = step.error
                ? `${colors.red}FAILED${colors.reset}`
                : `${colors.green}PASSED${colors.reset}`;

            this.logger.info(
                `${colors.gray}  ✓ Finished step: ${step.title} - ${statusIcon} (${duration}ms)${colors.reset}`,
                { projectName }
            );

            if (step.error) {
                if (step.error.stack) {
                    const indentedStack = step.error.stack
                        .split('\n')
                        .map((line) => `      ${line}`)
                        .join('\n');
                    this.logger.error(`${colors.red}${indentedStack}${colors.reset}`, { projectName });
                } else {
                    this.logger.error(`${colors.red}    Error: ${step.error.message}${colors.reset}`, { projectName });
                }
            }
        }
    }

    onTestEnd(test: TestCase, result: TestResult) {
        const projectName = test.parent.project()?.name || 'Global';
        let statusColor = colors.reset;

        if (result.status === 'passed') {
            statusColor = colors.green;
        } else if (result.status === 'failed' || result.status === 'timedOut') {
            statusColor = colors.red;
        } else if (result.status === 'skipped') {
            statusColor = colors.yellow;
        }

        const duration = (result.duration / 1000).toFixed(2) + 's';
        this.logger.info(
            `${statusColor}Finished test: ${test.title} - ${result.status.toUpperCase()} (${duration})${colors.reset}`,
            { projectName }
        );

        const record = {
            title: test.title,
            project: test.parent.project()?.name || 'unknown',
            status: result.status,
            duration: result.duration,
        };
        this.testResults.push(record);
    }

    async onEnd(result: FullResult) {
        this.logger.info(`${colors.bold}Finished the run: ${result.status.toUpperCase()}${colors.reset}`);

        this.logger.info(`Total Tests: ${this.testResults.length}`);

        const passed = this.testResults.filter((r) => r.status === 'passed').length;
        const failed = this.testResults.filter((r) => r.status !== 'passed' && r.status !== 'skipped').length;
        const skipped = this.testResults.filter((r) => r.status === 'skipped').length;

        this.logger.info(`${colors.green}Passed: ${passed}${colors.reset}`);
        this.logger.info(`${colors.red}Failed: ${failed}${colors.reset}`);
        this.logger.info(`${colors.yellow}Skipped: ${skipped}${colors.reset}`);
        this.logger.info(`Duration: ${(result.duration / 1000).toFixed(2)}s`);

        // await this.uploadResults();
    }

    /* private async uploadResults() {
        this.logger.info('Initiating Batch Upload of Results...');
        await new Promise(resolve => setTimeout(resolve, 1200));
        this.logger.info('Batch Upload Completed Successfully (Simulated)');
    } */
}

export default CustomReporter;
