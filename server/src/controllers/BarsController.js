const {Bar} = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  async index (req, res) {
    try {
      // see whether search query is set
      let bars = null
      const search = req.query.search
      if (search) {
        bars = await Bar.findAll({
          where: {
            [Op.or]: [
              'name', 'time', 'offering' 
            ].map(key => ({
              [key]: {
                [Op.like]: `%${search}%`
              }
            }))
          }
        })
      } else {
        bars = await Bar.findAll({
          limit: 10
        })
        // console.log('barscontroller', bars)
      }
      res.send(bars)
      console.log('AAAAAAAAAAAHHHHHHHHHHHHH', bars)
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
        error: 'An error has occured trying to show your request'
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
  },
  async put (req, res) {
    try {
      await Bar.update(req.body, {
        where: {
          id: req.params.barId
        }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to update your content'
      })
    }
  }
}
