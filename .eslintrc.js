module.exports = {
  root: true,
  overrides: [
    {
      files: ['src/**/*.spec.ts', 'src/**/*.d.ts'],
      parserOptions: {
        project: './src/tsconfig.spec.json',
      },
      // Jasmine rules
      extends: ['plugin:jasmine/recommended'],
      // Plugin to run Jasmine rules
      plugins: ['jasmine'],
      env: { jasmine: true },
      // Turn off 'no-unused-vars' rule
      rules: {},
    },
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.json'],
        createDefaultProgram: true,
      },
      extends: [
        'plugin:@angular-eslint/recommended',
        'airbnb-typescript/base',
        'prettier',
        'plugin:prettier/recommended',
        'plugin:import/recommended',
        'plugin:security/recommended',
      ],
      rules: {
        'import/named': 'off',
        'import/prefer-default-export': 'off',
        'object-curly-newline': 'off',
        'implicit-arrow-linebreak': 'off',
        'function-paren-newline': 'off',
        'security/detect-object-injection': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
      },
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
        },
      },
    },
    {
      files: ['*.component.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {
        'max-len': ['error', { code: 500 }],
        '@angular-eslint/template/eqeqeq': [
          'error',
          {
            allowNullOrUndefined: true,
          },
        ],
      },
    },
    {
      files: ['*.component.ts'],
      extends: [
        'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:security/recommended',
      ],
    },
  ],
};
