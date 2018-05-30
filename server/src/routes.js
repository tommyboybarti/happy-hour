const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
  // defining a route in express by setting a http request (post command) to a register endpoint (or controller in this case)
  app.post('/register',
  // calling middelware functions
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
}
