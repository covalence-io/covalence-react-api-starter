const path = require('path');

const serverConfig = {
    entry: './src/server/server.ts',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
              configFile: 'tsconfig.server.json'
          }
        }
      ]
    },
    resolve: {
      extensions: ['.tsx','.ts','.js']
    },
    output: {
      filename: 'server.js',
      path: path.resolve(__dirname, 'dist')
    },
    target: 'node'
  };

  const clientConfig = {

  };

module.exports = [serverConfig]