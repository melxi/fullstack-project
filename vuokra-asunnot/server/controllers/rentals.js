const rentalsRouter = require('express').Router()
const User = require('../models/user')

rentalsRouter.get('/', async (req, res) => {
  const users = await User.find({})

  res.json(users.map(user => user.toJSON()))
})

rentalsRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    
    res.json(user.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = rentalsRouter