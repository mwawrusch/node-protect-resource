_ = require 'underscore'

###
Middledware used to protect a resource. It requires that a logged on user
is present, otherwise we redirect to root

@todo
Set flash info message in case we need to log in.

@example

protectResourceMiddleware = require ('protect-resource').protectResourceMiddleware

Protects all routes at /settings and below. Does not impose roles requirements
app.get '/settings/?*',protectResourceMiddleware(),  @index

Protects all routes at /admin and below, requires the user to be of type admin.
app.get '/admin/?*',protectResourceMiddleware( roles : ['admin']),  @index

you can use opts.redirectPath to specify a path to return too, otherwise the referer is used.
###
module.exports = protectResourceMiddleware = (opts = {}) ->
  fn = (req, res, next) ->
    isAuthorized = !!req.user

    if isAuthorized and opts.roles and _.isArray opts.roles
      for role in opts.roles
        isAuthorized = false if !_.contains(req.user.roles, role)

    unless isAuthorized
      res.format
        html: ->
          nextPage = opts.redirectPath || req.url
          req.flash 'error',  'You are not authorized to access this page - sorry.' if req.flash
          res.cookie 'post-login-page',nextPage,{ maxAge: 60 * 60 * 1000, httpOnly: true }
          res.redirect("/users/sign-in")
        json: ->
          res.json 401,
              message : "You are not authorized to access this page - sorry."
              errors: []
      return # IMPORTANT, KEEP THIS RETURN
    next()
  return fn
  
