const AuthenticationController = require('./controllers/AuthenticationController')

module.exports = (app) => {
  // defining a route in express by setting a http request (post command) to a register endpoint (or controller in this case)
  app.post('/register',
    AuthenticationController.register)
}
