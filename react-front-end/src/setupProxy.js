const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://oversea-financials-api.herokuapp.com',
      changeOrigin: true,
    })
  );
};