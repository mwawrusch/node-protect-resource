###
Complimentary module to protectResourceMiddleware that performs redirection on successful log in. Note that this should
be only added to the primary return point (most likely root)
@example
app.get '/', protectResourceRedir(), ...

@param {object} opts additional protection options. Unused for now
###
module.exports = protectResourceRedirectMiddleware = (opts = {}) ->

  fn = (req,res,cb) ->
    if req.user
      cookie = req.cookies['post-login-page']

      if cookie
        res.cookie 'post-login-page',null,{ maxAge: 0, httpOnly: true } # Delete the cookie

        res.redirect cookie
    cb()
  fn
