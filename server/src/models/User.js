const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return;
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      // saving the hashed pw
      user.setDataValue('password', hash)
    })
}

// File that exports a fct which takes sequlize and DataTypes = seq model
module.exports = (sequelize, DataTypes) => {
// seq. defines a new model called User for storing user related info
  const User = sequelize.define('User', {
    // attributes
    email: {
      type: DataTypes.STRING,
      // only one user per emailaddress
      unique: true
    },
    password: {
      type: DataTypes.STRING,
    },
  }, {
    hooks: {
      beforeSave: hashPassword
      }
    })

  // attach method on prototype. User model now takes over the pw compare instead of controller model
  User.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
  }
  return User
}
