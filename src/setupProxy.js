const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/proxy',
    createProxyMiddleware({
      target: 'https://api.weibo.com',
      pathRewrite: {'/proxy': '/'},
      changeOrigin: true,
    })
  )
}
