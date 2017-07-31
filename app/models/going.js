'use strict'
const mongoose = require('mongoose')

const Going = mongoose.Schema({
  user: String,
  barId: String
})

// create the model for users and expose it to our app
module.exports = mongoose.model('Going', Going)
