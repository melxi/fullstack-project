const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const rentalsRouter = require('./controllers/rentals')
const authRouter = require('./controllers/auth')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { 
  useNewUrlParser: true, 
  useFindAndModify: false, 
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => logger.info('connected to MongoDB'))
  .catch(error => logger.error('error connecting to MongoDB:', error.message))

app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use('/api/rentals', rentalsRouter)
app.use('/api/auth', authRouter)

app.get('/', (req, res) => {
  res.send('<h1>Melxi</h1>')
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app