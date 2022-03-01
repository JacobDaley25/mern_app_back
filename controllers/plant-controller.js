const express= require('express')
const plant = express.Router()
const Plants = require('../models/plantSchema.js')

plant.get('/', (req,res)=>{
  Plants.find({}, (error, foundPlants)=>{
    res.json(foundPlants)
  })
})

plant.delete('/:_id', (req,res)=>{
  Plants.findByIdAndRemove(req.params._id, (error, deletedPlant)=>{
    res.json(deletedPlant)
  })
})
plant.put('/:_id', (req,res)=> {
  Plants.findByIdAndUpdate(req.params._id, req.body, {new:true}, (error, updatedPlant)=>{
    res.json(updatedPlant)
  })
})

plant.post('/', (req,res)=>{
  Plants.create(req.body, (error, createdPlant)=>{
    res.json(createdPlant)
  })
})

module.exports = plant
