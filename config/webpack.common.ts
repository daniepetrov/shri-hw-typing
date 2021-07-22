import path from 'path'

export default {
  entry: {
    index: './src/index.tsx',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/'),
    },
  },
}
