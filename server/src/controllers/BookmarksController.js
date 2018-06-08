const {Bookmark} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      // see whether search query is set
      let bars = null
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
}
