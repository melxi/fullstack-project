const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
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
    next(exception)
  }
})

usersRouter.post('/', async (req, res, next) => {
  const body = req.body

  if (!body.password || body.password.length < 5) {
    res.status(400).send({ error: "The password must contain at least 5 characters" })
  } else {
    const saltsRound = 10
    const passwordHash = await bcrypt.hash(body.password, saltsRound)
    const user = User({
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      passwordHash
    })

    try {
      const savedUser = await user.save()
      res.status(201).json(savedUser)
    } catch (exception) {
      next(exception)
    }
  }
})

module.exports = usersRouter