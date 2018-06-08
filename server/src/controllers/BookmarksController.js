const {
  Bar,
  Bookmark
} = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      // const userId = req.user.id
      const {barId, userId} = req.query
      const where = {
        UserId: userId
      }
      if (barId) {
        where.BarId = barId
      }
      const bookmarks = await Bookmark.findAll({
        where: where,
        include: [
          {
            model: Bar
          }
        ]
      }).map(bookmark => bookmark.toJSON())
        .map(bookmark => _.extend(
          {},
          bookmark.Bar,
          bookmark
        ))
      res.send(bookmarks)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch your bookmark'
      })
    }
  },
  async post (req, res) {
    try {
      // const userId = req.user.id
      const {barId, userId} = req.body
      const bookmark = await Bookmark.findOne({
        where: {
          BarId: barId,
          UserId: userId
        }
      })
      if (bookmark) {
        return res.status(400).send({
          error: 'You have already set a bookmark'
        })
      }
      const newBookmark = await Bookmark.create({
        BarId: barId,
        UserId: userId
      })
      res.send(newBookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured setting your bookmark'
      })
    }
  },
  async delete (req, res) {
    try {
      const {bookmarkId} = req.params
      const bookmark = await Bookmark.findById(bookmarkId)
      await bookmark.destroy()
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to delete your bookmark'
      })
    }
  }
}
