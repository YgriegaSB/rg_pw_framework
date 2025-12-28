import type { Reporter, TestCase, TestResult, FullResult, FullConfig, Suite } from '@playwright/test/reporter';
import { createTestLogger } from '@utils/logger';

class CustomReporter implements Reporter {
    private testResults: { title: string; status: string; duration: number; project: string }[] = [];
    private logger = createTestLogger('CustomReporter', 'Global');

    onBegin(config: FullConfig, suite: Suite) {
        this.logger.info(`Starting execution of ${suite.allTests().length} tests.`);
    }

    onTestEnd(test: TestCase, result: TestResult) {
        const record = {
            title: test.title,
            project: test.parent.project()?.name || 'unknown',
            status: result.status,
            duration: result.duration
        };
        this.testResults.push(record);
    }

    async onEnd(result: FullResult) {
        this.logger.info(`--- EXECUTION SUMMARY ---`);
        this.logger.info(`Total Tests: ${this.testResults.length}`);

        const passed = this.testResults.filter(r => r.status === 'passed').length;
        const failed = this.testResults.filter(r => r.status !== 'passed' && r.status !== 'skipped').length;
        const skipped = this.testResults.filter(r => r.status === 'skipped').length;

        this.logger.info(`Passed: ${passed}`);
        this.logger.info(`Failed: ${failed}`);
        this.logger.info(`Skipped: ${skipped}`);
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
