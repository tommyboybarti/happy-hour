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
  // connect to database and load in some configurations from the config file
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

// helper function creating access to all models in the folder, so we don't have to declare them in squelize every single file
// writing some functionality to read thru models folder
// read thru the current dir and return an array of files
fs.readdirSync(__dirname)
// filter out index.js
  .filter((file) => 
    file !== 'index.js'
  )
  .forEach((file) => {
    // find model and import it in seq.
    const model = sequelize.import(path.join(__dirname, file))
    // for instance db.User = model
    db[model.name] = model
  })

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})
  
// seq = ORM, create access to Objects by storing them in vars
db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
