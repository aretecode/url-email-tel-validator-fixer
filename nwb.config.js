module.exports = {
  type: 'web-module',
  babel: {
    plugins: ['transform-flow-strip-types']
  },
  webpack: {
    extra: {
      devtool: '#source-map',
    }
  },
  npm: {
    global: '',
    jsNext: true,
    umd: false
  }
}
