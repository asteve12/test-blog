const path = require('path');
module.exports = {
  i18n: {
    locales: ['en', 'fr-BJ'],
    defaultLocale: 'en'
  },
  outputFileTracing: true,
  localePath: path.resolve('./public/locales')
};
