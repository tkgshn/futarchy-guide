const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja'],
    localePath: path.resolve('./public/locales'), // Ensure this path is correct
  },
  // Enable Suspense for loading translations
  react: { useSuspense: true },
};
