const express = require('express')
const mongoose = require('mongoose')
const app = express()
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const usersRouter = require('./controllers/users')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
  .then(() => logger.info('connected to MongoDB'))
  .catch(error => logger.error('error connecting to MongoDB:', error.message))

app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)

app.use('/api/users', usersRouter)

app.get('/', (req, res) => {
  res.send('<h1>Melxi</h1>')
})

module.exports = app