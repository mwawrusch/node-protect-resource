/*
Complimentary module to protectResource that performs redirection on successful log in. Note that this should
be only added to the primary return point (most likely root)
@example
app.get '/', protectResourceRedir(), ...

@param {object} opts additional protection options. Unused for now
*/


(function() {
  var protectResourceRedirectSetup;

  module.exports = protectResourceRedirectSetup = function(opts) {
    var fn;
    if (opts == null) {
      opts = {};
    }
    fn = function(req, res, cb) {
      var cookie;
      if (req.user) {
        cookie = req.cookies['post-login-page'];
        if (cookie) {
          res.cookie('post-login-page', null, {
            maxAge: 0,
            httpOnly: true
          });
          res.redirect(cookie);
        }
      }
      return cb();
    };
    return fn;
  };

}).call(this);

/*
//@ sourceMappingURL=protect-resource-redirect.js.map
*/