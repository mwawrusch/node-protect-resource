###
protect-resource primary entry point
###

protectResourceRedirectMiddleware = require('./protect-resource-redirect-middleware')
protectResourceMiddleware = require('./protect-resource-middleware')

module.exports =
  protectResourceRedirectMiddleware : protectResourceRedirectMiddleware
  protectResourceMiddleware : protectResourceMiddleware
