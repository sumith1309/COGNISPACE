module.exports = {
  // TypeScript and JavaScript files: format only (Next.js handles linting separately)
  '*.{ts,tsx}': ['prettier --write'],

  // Style files: format only
  '*.{css,scss}': ['prettier --write'],

  // JSON, Markdown, and config files: format only
  '*.{json,md,mdx,yml,yaml}': ['prettier --write'],
};
