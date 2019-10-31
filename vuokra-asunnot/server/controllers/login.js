const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (req, res) => {
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

module.exports = loginRouter