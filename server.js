const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const plantController = require('./controllers/plant-controller.js')

app.use(express.json())
app.use(cors())
app.use('/plants', plantController)

app.listen(3000, () => {
  console.log('listening...');
})

mongoose.connect('mongodb://localhost:27017/merncrud')
mongoose.connection.once('open', () => {
  console.log('connected to mongod');
})
