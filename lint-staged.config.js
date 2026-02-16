module.exports = {
  // TypeScript and JavaScript files: lint then format
  '*.{ts,tsx}': [
    'bash -c "ESLINT_USE_FLAT_CONFIG=false eslint --fix --max-warnings=0 $0"',
    'prettier --write',
  ],

  // Style files: format only
  '*.{css,scss}': ['prettier --write'],

  // JSON, Markdown, and config files: format only
  '*.{json,md,mdx,yml,yaml}': ['prettier --write'],
};
