const {
  sequelize,
  Bar,
  User
} = require('../src/models')

const Promise = require('bluebird')
const bars = require('./bars.json')
const users = require('./users.json')

// run thru json array and create new users or bars when db is empty
sequelize.sync({force: true})
  .then(async function () {
    await Promise.all(
      users.map(user => {
        User.create(user)
      })
    )
    await Promise.all(
      bars.map(bar => {
        Bar.create(bar)
      })
    )
  })
