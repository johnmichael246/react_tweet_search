const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  const { REACT_APP_TWITTER_BASE_URL } = process.env
  if (REACT_APP_TWITTER_BASE_URL) {
    app.use(
      '/api/twitter',
      proxy({
        target: REACT_APP_TWITTER_BASE_URL,
        changeOrigin: true,
        pathRewrite: { '^/api/twitter': '' }
      })
    );
  }
};
