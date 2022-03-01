const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const plantController = require('./controllers/plant-controller.js')
const bcrypt = require('bcrypt')
const saltRounds = 10
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
require('dotenv').config()
const db = mongoose.connection;
const PORT = process.env.PORT || 3000
const mongoURI = String(process.env.MONGODBURI)
const userController=require('./controllers/user_controller.js')



app.use(express.json())
app.use(cors())
app.use('/plants', plantController)
app.use('/users', userController)

app.listen(PORT, () => {
  console.log('listening...');
})

mongoose.connect(mongoURI)
mongoose.connection.once('open', () => {
  console.log('connected to mongod');
})
