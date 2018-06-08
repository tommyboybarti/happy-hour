const {
  sequelize,
  Bar,
  User,
  Bookmark
} = require('../src/models')

const Promise = require('bluebird')
const bars = require('./bars.json')
const users = require('./users.json')
const bookmarks = require('./bookmarks.json')

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
    // this needs to come after user & songs, coz they need to exist for the association
    await Promise.all(
      bookmarks.map(bookmark => {
        Bookmark.create(bookmark)
      })
    )
  })
