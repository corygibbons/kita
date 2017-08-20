module.exports = {
  parser: 'sugarss',
  plugins: [
    require('postcss-easy-import')(),
    require('postcss-simple-vars'),
    require('postcss-nested')(),
    require('postcss-cssnext')()
  ]
};
