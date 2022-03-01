const mongoose = require('mongoose')

const plantSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  wasWatered: Boolean
}, {timestamp: true})

const Plant = mongoose.model('plants', plantSchema)

module.exports = Plant
