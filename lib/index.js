/*
protect-resource primary entry point
*/


(function() {
  var protectResourceMiddleware, protectResourceRedirectMiddleware;

  protectResourceRedirectMiddleware = require('./protect-resource-redirect-middleware');

  protectResourceMiddleware = require('./protect-resource-middleware');

  module.exports = {
    protectResourceRedirectMiddleware: protectResourceRedirectMiddleware,
    protectResourceMiddleware: protectResourceMiddleware
  };

}).call(this);

/*
//@ sourceMappingURL=index.js.map
*/