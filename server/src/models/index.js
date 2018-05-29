// index file to connect to db
// NodeJS filesystem
const fs = require('fs')
// path model..
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
// declare db object
const db = {}

// declare seq object
const sequelize = new Sequelize(
  // connect database which can be passed to seq.
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

// helper function to add more models down the road
// writing some functionality to read thru models folder
// read thru the current dir and return an array of files
fs.readdirSync(__dirname)
// filter out index.js
  .filter((file) => 
    file !== 'index.js'
    )
    
  /* SOMETHING DOES NOT WORK HERE!  -----------------

  check : https://github.com/sequelize/express-example

  // load the files we found in models into seq.

  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })
  
------------------------------------ */  

// seq = ORM, create access to Objects byd storing them in vars
db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
