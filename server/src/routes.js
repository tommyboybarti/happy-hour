const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const BarsController = require('./controllers/BarsController')

module.exports = (app) => {
  // defining a route in express by setting a http request (post command) to a register endpoint (or controller in this case)
  app.post('/register',
  // calling middelware functions
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  // adding a login endpoint which calls the AC login method
  app.post('/login',
    AuthenticationController.login)

  app.get('/bars',
    BarsController.index)
  app.get('/bars/:barId',
    BarsController.show)
  app.post('/bars',
    BarsController.post)
  app.put('/bars/:barId',
    BarsController.put)
}
