const bcrypt= require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

sessions.post('/', (req, res) => {

  User.findOne({username:req.body.username}, (error, foundUser) => {

    if (error){
      console.log('error');
    }if (!foundUser) {
      console.log('no user found');
    }else{
      //user is found
      //check if passwords match
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        //add user to session
      req.session.currentUser = foundUser
      // redirect to home page
      res.redirect('/')
    } else{
      //passwords do not match
      console.log('password does not match');
    }
    }
  })
// })
})

module.exports = sessions
