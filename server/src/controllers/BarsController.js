const {Bar} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const bar = await Bar.findAll({
        limit: 10
      })
      res.send(bar)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch your request'
      })
    }
  },
  async show (req, res) {
    try {
      const bar = await Bar.findById(req.params.barId)
      res.send(bar)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch your request'
      })
    }
  },
  async post (req, res) {
    try {
      const bar = await Bar.create(req.body)
      res.send(bar)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to create your content'
      })
    }
  }
}
