const {Bookmark} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const {barId, userId} = req.query
      // find the one bookmark
      const bookmark = await Bookmark.findOne({
        where: {
          BarId: barId,
          UserId: userId
        }
      })
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch your bookmark'
      })
    }
  },
  async post (req, res) {
    try {
      const bookmark = req.query
      const newBookmark = await Bookmark.create(bookmark)
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
