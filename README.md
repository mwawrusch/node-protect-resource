protect-resource
===========================

npm install protect-resource

## About
Middleware that deals with protection of resources. Supports roles and works transparently with all login vectors.

How to use:

In your main express file:

```coffeescript
protectResource = require 'protect-resource'


#... somewhere after you might have a user
app.use '/admin',protectResource.protectResourceMiddleware( roles : ['admin'], redirectPath: '/admin')
app.use protectResource.protectResourceRedirectMiddleware()

### 
This example protects admin and allows access only to users with admin roles. Leave the roles parameter out if you just want to check for user signed in. Roles must be an array, btw.
###

```


## Release Notes

### 0.2.2
* Doc Update

### 0.2.1
* First version

## Internal Stuff

docs
test
watch --> compiles, triggers test
remove unused grunts
release compiles first


## Stuff

npm test
npm run-script docs

node_modules/.bin/grunt                   # Starts the watch & test run
node_modules/.bin/grunt coffee            # Compiles the coffeescript

node_modules/.bin/grunt release
node_modules/.bin/grunt release:minor
node_modules/.bin/grunt release:major


## Contributing to node-protect-resource
 
* Check out the latest master to make sure the feature hasn't been implemented or the bug hasn't been fixed yet
* Check out the issue tracker to make sure someone already hasn't requested it and/or contributed it
* Fork the project
* Start a feature/bugfix branch
* Commit and push until you are happy with your contribution
* Make sure to add tests for it. This is important so I don't break it in a future version unintentionally.
* Please try not to mess with the package.json, version, or history. If you want to have your own version, or is otherwise necessary, that is fine, but please isolate to its own commit so I can cherry-pick around it.

## Copyright

Copyright (c) 2013 Martin Wawrusch See LICENSE for
further details.

