// Joi is for the validation of different inputs in express
const Joi = require('joi')

module.exports = {
  // express middelware using next to invoque the next thing in the route path
  // method dealing with the request that comes in, sending a response and invoking the next step
  register (req, res, next) {
    const schema = {
      // joi has some readymade validation features like email()
      email: Joi.string().email(),
      password: Joi.string().regex(
        // gotta be lower or uppercase A to Z and a min of 8 and max of 32 chars
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }
    // validating req.body against schema
    const {error, value} = Joi.validate(req.body, schema)

    if (error) {
      // show the key that failed (email or pw)
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address'
          })
          break
        case 'password':
          res.status(400).send({
            error: `Please make sure the password has got at least 8 and not more than 32 lower or upper case characters`
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration information'
          })
      }
    } else {
      // if all is well we move on to AuthenticationController (see routes.js)
      next()
    }
  }
}
