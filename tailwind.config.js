module.exports = {
  content: ["./apps/front-end/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, '/apps/front-end'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
}
