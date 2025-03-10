const LoadablePlugin = require('@loadable/webpack-plugin');
const path = require('path');
const sass = require('sass');
module.exports = {
  plugins: [new LoadablePlugin()],
  output: {
    publicPath: '/',
  },
  rules: [
      {
        test: /\.scss$/,
        enforce: "pre",
        use: [
          'style-loader',
          'css-loader',          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                implementation: sass,
                api: 'modern-compiler',
                quietDeps: true,
                renderSync: true,
                deprecation: { silence: ['legacy-js-api'] },
              },
            },
          },
        ],
        exclude: [
          /node_modules\/@antv\/util/,
        ],
      },
    ],
};
