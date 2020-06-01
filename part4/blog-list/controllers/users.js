const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, date: 1, author: 1 })
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const validateUsername = () => {
    if (!body.username) {
      return response.status(400).json({ error: `username missing`})
    } else if (body.username.length <= 2) {
      return response.status(400).json({ error: `username must be at least 3 characters long` })
    }
  }

  const validatePassword = () => {
    if (!body.password) {
      return response.status(400).json({ error: `password missing`})
    } else if (body.password.length <= 2) {
      return response.status(400).json({ error: `password must be at least 3 characters long` })
    }
  }

  validateUsername()
  validatePassword()

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter