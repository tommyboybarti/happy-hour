// controller folder is to define all the endpoints
// import User model as an {attribute} from index.js (which reads thru the folder)
const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

// helper method for creating a token
function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

// export all routes that are connected to authentication
module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      // send back user obj to client who's requested the input
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
  } catch (err) {
      res.status(400).send({
        error: 'This email is already in use'
      })
    }
  },
  async login (req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      
      // Debugging: check if there is a user registered
      // console.log('user', user.toJSON())

      if (!user) {
        res.status(403).send({
          error: 'The login information was incorrect'
        })
      }
      const isPasswordValid = await user.comparePassword(password)
      const isEmailValid = email === user.email
      // Debugging: 
      // console.log(email, user.email)
      // console.log(password, user.password)
      // console.log(isPasswordValid) 
      // console.log(isEmailValid)
      
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })        
      }

      const userJson = user.toJSON()

      if (isEmailValid && isPasswordValid) {
        res.status(200).send({
          // pass user information to userJson
          user: userJson,
          token: jwtSignUser(userJson)
        })
      }

      // Debugging..
      // console.log('user', 'userJson')

  } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to login in'
      })
      console.log(err)
    }
  },    
}

