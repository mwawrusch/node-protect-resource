###
Complimentary module to protectResourceMiddleware that performs redirection on successful log in. 
Placement of this module is important. It requires a current user, so having a session is wise ;-)
@example
app.use protectResource.protectResourceRedirectMiddleware()

@param {object} opts additional protection options. Unused for now
###
module.exports = protectResourceRedirectMiddleware = (opts = {}) ->

  fn = (req,res,cb) ->
    if req.user
      cookie = req.cookies['post-login-page']

      if cookie
        res.cookie 'post-login-page',null,{ maxAge: 0, httpOnly: true } # Delete the cookie

        res.redirect cookie
        return #IMPORTANT - don't loose that one.
    cb()
  fn
