const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})

  res.json(users.map(user => user.toJSON()))
})

usersRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    
    res.json(user.toJSON())
  } catch (exception) {
    console.log(exception)
    next(exception)
  }
})

module.exports = usersRouter