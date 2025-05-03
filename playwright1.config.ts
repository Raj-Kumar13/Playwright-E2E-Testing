import { ReporterDescription, defineConfig, devices } from '@playwright/test';
import { OrtoniReportConfig } from 'ortoni-report';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(process.cwd(), '.env') });

export const reportConfig: OrtoniReportConfig = {
    base64Image: true,
    title: 'Cap Data Push Test Report',
    showProject: true,
    folderPath: 'reports',
    filename: 'ortoni-report.html',
    authorName: 'LSaaS Tester',
    preferredTheme: 'light',
    projectName: 'Cap Data Push Test Results',
    testType: 'Smoke'
};

const rpConfig = {
    apiKey: process.env.RP_APIKEY,
    endpoint: process.env.RP_ENDPOINT,
    launch: process.env.RP_LAUNCH,
    project: process.env.RP_PROJECT,
    description: 'Playwright tests integration with ReportPortal',
    attributes: [{ key: 'SUITE_TYPE', value: `${process.env.SUITE_TYPE}` }, { key: 'TEST_TYPE', value: `${process.env.TEST_TYPE}` }]
};
let allReporter: ReporterDescription[];

if (process.env.REPORT_PORTAL_SWITCH === 'ON') {
    allReporter = ([['@reportportal/agent-js-playwright', rpConfig]]);
}
else {
    allReporter = [
        ['ortoni-report', reportConfig],
        ['dot'],
        ['html', { open: 'never' }],
        ['json', { outputFile: 'playwright-report/index.json' }]
    ];
}


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: './src/tests',
    timeout: 60_0000,
    /* Run tests in files in parallel */
    fullyParallel: false,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : 1,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: allReporter,
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        // baseURL: 'http://127.0.0.1:3000',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry'
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'web',
            testDir: './src/tests/web',
            use: {
                ...devices['Desktop Chrome'],
                screenshot: 'only-on-failure',
                actionTimeout: 10_000,
                launchOptions: {
                    args: [
                        '--window-size=1920,1040'
                    ]
                }
            }
        },
        {
            name: 'api',
            testDir: './src/tests/api',
            timeout: 60 * 1000
        },
        {
            name: 'apiReportPortal',
            testDir: './src/tests/api',
            timeout: 60 * 1000

        },
        {
            name: 'reverseMappingCreateSecurityA',
            testDir: './src/tests/api/specs/reverseTransformation/createSecurity',
            testMatch: '**/securityTypeA.spec.ts',
            timeout: 60 * 1000
        },
        {
            name: 'reverseMappingCreateSecurityB',
            testDir: './src/tests/api/specs/reverseTransformation/createSecurity',
            testMatch: '**/securityTypeB.spec.ts',
            timeout: 60 * 1000
        },
        {
            name: 'reverseMappingCreateSecurityC',
            testDir: './src/tests/api/specs/reverseTransformation/createSecurity',
            testMatch: '**/securityTypeC.spec.ts',
            timeout: 60 * 1000
        },
        {
            name: 'reverseMappingCreateSecurityE',
            testDir: './src/tests/api/specs/reverseTransformation/createSecurity',
            testMatch: '**/securityTypeE.spec.ts',
            timeout: 60 * 1000
        },
        {
            name: 'reverseMappingCreateSecurityF',
            testDir: './src/tests/api/specs/reverseTransformation/createSecurity',
            testMatch: '**/securityTypeF.spec.ts',
            timeout: 60 * 1000
        },
        {
            name: 'reverseMappingCreateSecurityG',
            testDir: './src/tests/api/specs/reverseTransformation/createSecurity',
            testMatch: '**/securityTypeG.spec.ts',
            timeout: 60 * 1000
        },
        {
            name: 'reverseMappingCreateSecurityH',
            testDir: './src/tests/api/specs/reverseTransformation/createSecurity',
            testMatch: '**/securityTypeH.spec.ts',
            timeout: 60 * 1000000
        },
        {
            name: 'reverseMappingCreateSecurityI',
            testDir: './src/tests/api/specs/reverseTransformation/createSecurity',
            testMatch: '**/securityTypeI.spec.ts',
            timeout: 60 * 1000
        },
        {
            name: 'reverseMappingCreateSecurityJ',
            testDir: './src/tests/api/specs/reverseTransformation/createSecurity',
            testMatch: '**/securityTypeJ.spec.ts',
            timeout: 60 * 1000
        },
        {
            name: 'reverseMappingUpdateSecurityB',
            testDir: './src/tests/api/specs/reverseTransformation/updateSecurity',
            testMatch: '**/securityTypeB.*.spec.ts',
            timeout: 60 * 1000
        },
        {
            name: 'reverseMappingUpdateSecurityC',
            testDir: './src/tests/api/specs/reverseTransformation/updateSecurity',
            testMatch: '**/securityTypeC.*.spec.ts',
            timeout: 60 * 1000
        },
        {
            name: 'reverseMappingUpdateSecurityF',
            testDir: './src/tests/api/specs/reverseTransformation/updateSecurity',
            testMatch: '**/securityTypeF.*.spec.ts',
            timeout: 60 * 1000
        },
        {
            name: 'reverseMappingUpdateSecurityG',
            testDir: './src/tests/api/specs/reverseTransformation/updateSecurity',
            testMatch: '**/securityTypeG.*.spec.ts',
            timeout: 60 * 1000
        },
        {
            name: 'reverseMappingUpdateSecurityH',
            testDir: './src/tests/api/specs/reverseTransformation/updateSecurity',
            testMatch: '**/securityTypeH.*.spec.ts',
            timeout: 60 * 1000
        },
        {
            name: 'reverseMappingUpdateSecurityI',
            testDir: './src/tests/api/specs/reverseTransformation/updateSecurity',
            testMatch: '**/securityTypeI.*.spec.ts',
            timeout: 60 * 1000
        },
        {
            name: 'reverseMappingUpdateSecurityJ',
            testDir: './src/tests/api/specs/reverseTransformation/updateSecurity',
            testMatch: '**/securityTypeJ.*.spec.ts',
            timeout: 60 * 1000
        },
        {
            name: 'reverseMappingUpdateSecurityA',
            testDir: './src/tests/api/specs/reverseTransformation/updateSecurity',
            testMatch: '**/securityTypeA.*.spec.ts',
            timeout: 60 * 1000
        },
        {
            name: 'reverseMappingUpdateSecurityE',
            testDir: './src/tests/api/specs/reverseTransformation/updateSecurity',
            testMatch: '**/securityTypeE.*.spec.ts',
            timeout: 60 * 1000
        }
        // {
        //   name: 'firefox',
        //   use: { ...devices['Desktop Firefox'] },
        // },

        // {
        //   name: 'webkit',
        //   use: { ...devices['Desktop Safari'] },
        // },

        /* Test against mobile viewports. */
        // {
        //   name: 'Mobile Chrome',
        //   use: { ...devices['Pixel 5'] },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: { ...devices['iPhone 12'] },
        // },

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        // },
    ]

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://127.0.0.1:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});