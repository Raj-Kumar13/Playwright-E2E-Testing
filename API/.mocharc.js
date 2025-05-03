const { config } = require('dotenv');
config();

if (process.env.REPORT_PORTAL_SWITCH === "ON") {
    module.exports = {
        spec: ['src/test/composite/*/**.ts'],
        package: './package.json',
        extension: ['.ts'],
        timeout: 60 * 1000,
        color: true,
        grep: '',
        ignore: [''],
        reporter: '@reportportal/agent-js-mocha',
        'reporter-option': [
            'endpoint=https://report.apps-int.di1001.cpaas.test/api/v1',
            `apiKey=${process.env.REPORT_PORTAL_API_KEY}`,
            'launch=composite-api-test',
            `project=${process.env.REPORT_PORTAL_PROJECT}`,
            `attributes=env:${process.env.ENV};release:${process.env.RELEASE_NAME}`,
        ],
        require: ['ts-node/register, tsconfig-paths/register'],
        parallel: false,
        recursive: false,
        retries: 0,
        slow: '75',
        sort: false,
        ui: 'bdd'
    };
} else {
    module.exports = {
        spec: ['src/test/**/*.ts'],
        package: './package.json',
        extension: ['.ts'],
        timeout: 60 * 1000,
        color: true,
        grep: '',
        ignore: [''],
        reporter: 'mochawesome',
        'reporter-option': [
            'reportDir=report',
            'reportFilename=mocha',
            'reportTitle=API Regression Test Report',
            'charts=true',
            'code=true',
            'inline=true',
            'autoOpen=false',
            'showPassed=true',
            'showFailed=true',
            'showPending=true',
            'showSkipped=false',
            'showHooks=failed'
        ],
        require: ['ts-node/register, tsconfig-paths/register'],
        parallel: false,
        recursive: false,
        retries: 0,
        slow: '75',
        sort: false,
        ui: 'bdd'
    };
}