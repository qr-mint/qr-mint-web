module.exports = {
	extends: [ 'eslint:recommended', 'plugin:react/recommended' ],
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 13,
		sourceType: 'module',
	},
	plugins: ['react'],
	rules: {
		indent: [ 'error', 'tab' ],
		'linebreak-style': [ 'error', 'unix' ],
		quotes: [ 'warn', 'single' ],
		semi: [ 'error', 'always' ],
		'no-multi-spaces': 'error',
		'no-unused-vars': [
			'warn',
			{ vars: 'all', args: 'all', caughtErrors: 'all' },
		],
		'array-bracket-spacing': [ 'warn', 'always', { singleValue: false } ],
		'block-spacing': 'error',
		'space-before-blocks': 'error',
		'space-before-function-paren': 'error',
		'space-in-parens': [ 'error', 'never' ],
		'space-infix-ops': [ 'error', { int32Hint: false } ],
		'space-unary-ops': [
			2,
			{
				words: true,
				nonwords: false,
				overrides: {
					'++': false,
				},
			},
		],
		'key-spacing': [
			'error',
			{
				beforeColon: false,
				afterColon: true,
			},
		],
		'keyword-spacing': [
			'error',
			{
				before: true,
				after: true,
			},
		],
		'no-multiple-empty-lines': [
			'error',
			{
				max: 2,
				maxEOF: 1,
			},
		],
		'no-mixed-spaces-and-tabs': 'warn',
		'no-useless-escape': 'off',
		'no-redeclare': 'warn',
		'no-empty': 'warn',
		'no-undef': 'error',
		'no-constant-condition': 'warn',
		'no-async-promise-executor': 'warn',
		'no-prototype-builtins': 'warn',
		'no-irregular-whitespace': 'warn',
		'no-ex-assign': 'warn',
		'no-unreachable': 'warn',
		'no-inner-declarations': 'warn',
		'no-useless-catch': 'warn',
		'brace-style': 'warn',
		'object-curly-spacing': [ 'warn', 'always' ],
	},
};
