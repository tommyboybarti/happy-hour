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
    }
  })
  return User
}

