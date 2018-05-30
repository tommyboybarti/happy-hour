// controller folder is to define all the endpoints
// import User model
const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jstSecret, {
    expiresIn: ONE_WEEK
  })
}

// export all routes that are connected to authentication
module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      // send back user obj to client who's requested the input
      res.send(user.toJSON())
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
      console.log('user', user.toJSON())

      if (!user) {
        res.status(403).send({
          error: 'The login information was incorrect'
        })
      }
      const isPasswordValid = password === user.password
      // Debugging: 
      console.log(email, user.email)
      console.log(password, user.password)
      console.log(isPasswordValid) 
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })        
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
      
      // Debugging..
      // console.log('user', 'userJson')
  } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to login in'
      })
    }
  },    
}

