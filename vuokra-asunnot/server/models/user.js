const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    minlength: 5,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    minlength: 1,
    required: true
  },
  lastName: {
    type: String,
    minlength: 1,
    required: true
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  index: {
    type: String
  },
  city: {
    type: String
  },
  passwordHash: String
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)