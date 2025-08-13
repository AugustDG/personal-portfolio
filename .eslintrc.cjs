
module.exports = {
    root: true,
    extends: ['next', 'next/core-web-vitals'],
    plugins: [],
    rules: {
        'padding-line-between-statements': [
            'warn',
            { blankLine: 'always', prev: 'import', next: '*' },
            { blankLine: 'any', prev: 'import', next: 'import' },
            { blankLine: 'always', prev: '*', next: ['return', 'if', 'for', 'while', 'switch', 'try'] },
            { blankLine: 'always', prev: ['const', 'let', 'var'], next: ['block', 'block-like', 'if', 'for', 'while', 'switch', 'try', 'return', 'function'] },
            { blankLine: 'always', prev: '*', next: 'function' },
            { blankLine: 'always', prev: 'function', next: 'function' },
            { blankLine: 'always', prev: '*', next: 'export' }
        ],
        'object-curly-spacing': ['warn', 'always']
    }
};
