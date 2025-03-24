module.exports = {
    extends: 'next/core-web-vitals',
    rules: {
      // Disable TypeScript specific rules
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      
      // Disable React specific rules
      'react-hooks/exhaustive-deps': 'off',
      'react/no-unescaped-entities': 'off',
      
      // Disable Next.js specific rules
      '@next/next/no-img-element': 'off'
    }
  };