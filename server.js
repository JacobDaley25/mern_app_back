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
const corsOptions ={
  'supportsCredentials' => true,
'allowedOrigins' => ['*'],
'allowedOriginsPatterns' => [],
'allowedHeaders' => ['*'],
'allowedMethods' => ['*'],
'exposedHeaders' => [],
'maxAge' => 0,
}
const sessionController = require('./controllers/sessions-controller.js')
app.use(cors(corsOptions));


app.use(express.json())
app.use('/plants', plantController)
app.use('/users', userController)
app.use('/auth', sessionController)

app.listen(PORT, () => {
  console.log('listening...');
})

mongoose.connect(mongoURI)
mongoose.connection.once('open', () => {
  console.log('connected to mongod');
})
