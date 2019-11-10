const authRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

authRouter.post('/register', async (req, res, next) => {
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

authRouter.post('/login', async (req, res) => {
  const body = req.body

  const user = await User.findOne({ email: body.email })
  const passwordCorrect = user === null
  ? false
  : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    res.status(401).json({
      error: 'invalid email or password'
    })
  }

  const userForToken = {
    email: user.email,
    id: user.id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)
  
  res
    .status(200)
    .send({ token, email: user.email, firstName: user.firstName, lastName: user.lastName })
  
})

module.exports = authRouter