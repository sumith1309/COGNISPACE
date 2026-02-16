/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation changes
        'style', // Code style (formatting, semicolons, etc.)
        'refactor', // Code refactoring
        'perf', // Performance improvement
        'test', // Adding or updating tests
        'build', // Build system or external dependencies
        'ci', // CI/CD configuration
        'chore', // Maintenance tasks
        'revert', // Revert a previous commit
        'wip', // Work in progress (for feature branches only)
      ],
    ],
    'subject-case': [2, 'never', ['upper-case', 'pascal-case', 'start-case']],
    'subject-max-length': [2, 'always', 100],
    'body-max-line-length': [1, 'always', 200],
  },
};
