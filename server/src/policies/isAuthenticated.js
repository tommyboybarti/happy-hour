const passport = require('passport')

// custom logic for error message
module.exports = function(req, res, next) {
  passport.authenticate('jwt', function (err, user) {
    if (err || !user) {
      res.status(403).send({
        error: 'You do not have access to this resource'
      })
    } else {
      // set req.user
      req.user = user
      next()
    }
  })(req, res, next)
}