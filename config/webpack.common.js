const path = require('path')

module.exports = {
  entry: {
    index: './src/index.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/'),
    },
  },
}
