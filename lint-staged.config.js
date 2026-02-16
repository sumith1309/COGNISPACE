module.exports = {
  // TypeScript and JavaScript files: lint then format
  '*.{ts,tsx}': ['eslint --fix --max-warnings=0', 'prettier --write'],

  // Style files: format only
  '*.{css,scss}': ['prettier --write'],

  // JSON, Markdown, and config files: format only
  '*.{json,md,mdx,yml,yaml}': ['prettier --write'],
};
