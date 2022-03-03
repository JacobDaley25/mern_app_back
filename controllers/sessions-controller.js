const express = require ('express')
const sessions = express.Router()
const usersDB ={
  users: require('../models/users.js'),
  setUsers: function (data) {this.users = data}
}

const bcrypt = require('bcrypt')

const handleLogin = async (req,res)=>{
  const {username , password} = req.body
  if (!username || !password) return res.stats(400).json({'message':'Username and password are required'})
  const foundUser = usersDB.username.find(username => username === user)
  if (!foundUser) return res.sendStatus(401)
  const match = await bcrypt.compare(password, foundUser.password)
  if (match){
    res.json({'success':`User ${username} is loggined in!`})
  } else {
    res.sendStatus(401)
  }
}

sessions.post('/', handleLogin)

module.exports = sessions
