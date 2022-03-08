const mongoose = require('mongoose')

const plantSchema = new mongoose.Schema({
  username: String,
  name: String,
  image: String,
  description: String,
  wasWatered: Boolean
}, {timestamp: true})

const Plant = mongoose.model('plants', plantSchema)

module.exports = Plant
