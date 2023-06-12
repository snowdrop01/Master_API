const Coupan = require('../models/coupanModel')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify');
const { validateMongoID } = require('../utils/validateMondoDBId');

const createCoupan = asyncHandler(
  async (req,res) => {
    try{
        const coupan = await Coupan.create(req.body);
        res.json(coupan)
    }catch(error){
      throw new Error(error);
    }
  }
)

const updateCoupan = asyncHandler(
  async (req,res) => {
    try{
      const coupan = await Coupan.findByIdAndUpdate(req.params.id,req.body, {new: true});
      res.json(coupan);
    }catch(error){
      throw new Error(error)
    }
  }
)

const deleteCoupan = asyncHandler(
  async (req,res) => {
    try{
       const coupan = await Coupan.findByIdAndDelete(req.params.id);
       res.json(coupan);
    }catch(error){
      throw new Error(error)
    }
  }
)

const getCoupan = asyncHandler(
  async (req,res) => {
    try{
        const coupan = await Coupan.findById(req.params.id)
        res.json(coupan);
    }catch(error){
      throw new Error(error);
    }
  }
)

const getAllCoupan = asyncHandler(
  async (req,res) => {
    try{
        const coupan = await Coupan.find();
        res.json(coupan)
    }catch(error){
      throw new Error(error);
    }
  }
)

module.exports = {createCoupan,updateCoupan,deleteCoupan,getCoupan,getAllCoupan}