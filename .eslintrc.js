const { typescriptVersionIsAtLeast } = require("@typescript-eslint/typescript-estree");

module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/stylistic',
        'plugin:playwright/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugin: ['@typescriptVersionIsAtLeast'],
    root: true,
    rule: {
        'playwright/no-networkidle': 'off',
        'playwright/no-skipped-test': 'off',
        'no-useless-escape': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                'args': 'none',
                'caughtErrors': 'none',
                'ignoreRestSibling': true,
                'vars': 'all'
            },

        ],
        '@typescript-eslint/quotes': [
            'error',
            'single',
            {
                'avoidEscape': true,
                'allowTemplateLiterals': true
            }
        ],
        'indent': [
            'error',
            4,
            {
                'SwitchCase': 1
            }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'semi': [
            'error',
            'always',
            {
                'omitLatestOnLineBlock': true,
                'omitLatestOneLineClassBody': true
            }
        ],
        'no-extra-semi': 'error',
        'no-lonely-if': 'error',
        'no-dupe-else-if': 'error',
        '@typescript-eslint/restrict-plus-operands': [
            'error'
        ],
        '@typescript-eslint/no-misused-promises': [
            'error', {
                'checkVoidReturn': false,
                'checkSpreads': false
            }
        ],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'variable',
                format: ['camelCase', 'UPPER_CASE'],
                leadingUnderscore: 'allow',
                trailingUnderscore: 'allow'
            },
            {
                selector: 'import',
                format: ['camelCase', 'PascalCase']
            }
        ],
        'no-loss-of-precision': 'error',
        'eqeqeq': 'error',
        'prefer-regex-literals': [
            'error',
            {
                'disallowRedundantWrapping': true,
            }
        ],
        'line-between-class-members': [
            'error',
            'always',
            { 'exceptAfterSingleLine': true }
        ],
        '@typescript-eslint/ban-types': [
            'error',
            {
                'extendDefaults': true
            }
        ],
        'comma-dangle': 'error',
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                'multiline': {
                    'delimiter': 'semi',
                    'requireLast': true,
                },
                'singleline': {
                    'delimiter': 'comma',
                    'requireLast': true,
                },
                'multilineDetection': 'brackets'
            }
        ]
    },
    ignorePatterns: ['.vscode/**/*', 'playwright-report/**/*', 'report/**/*', 'node_modules']
}