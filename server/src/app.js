console.log('hello')
// grab the main file of every dependency
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

// allow app to get main functionality
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// defining a route in express by setting a http request (get command) to a status endpoint
app.get('/status', (req, res) => {
// send something back
  res.send({
    message: 'hello world!'
  })
})

app.listen(process.env.PORT || 8081)
