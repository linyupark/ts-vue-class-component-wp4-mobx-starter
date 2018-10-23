module.exports = {
  // parser: 'sugarss',
  plugins: {
    'postcss-pxtorem': {
      rootValue: 75,
      unitPrecision: 2,
      propWhiteList: ['*'],
      selectorBlackList: ['.no-rem'],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
    },
    autoprefixer: {
      browsers: ['iOS >= 8', 'Android >= 4']
    }
  }
};
