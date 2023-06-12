const Brand = require('../models/brandModel')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify');
const { validateMongoID } = require('../utils/validateMondoDBId');

const createBrand = asyncHandler(
  async (req,res) => {
    try{
      const brand = await Brand.create(req.body)
      res.json(brand)
    }catch(error){
      throw new Error(error);
    }
  }
)

const updateBrand = asyncHandler(
  async (req,res) => {
    try{
      const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {new:true})
      res.json(brand)
    }catch(error){
      throw new Error(error);
    }
  }
)

const deleteBrand = asyncHandler(
  async (req,res) => {
    try{
      const brand = await Brand.findByIdAndDelete(req.params.id)
      res.json(brand)
    }catch(error){
      throw new Error(error);
    }
  }
)

const getBrand = asyncHandler(
  async (req,res) => {
    try{
      const brand = await Brand.findById(req.params.id)
      res.json(brand)
    }catch(error){
      throw new Error(error);
    }
  }
)

const getAllBrand = asyncHandler(
  async (req,res) => {
    try{
      const brand = await Brand.find();
      res.json(brand)
    }catch(error){
      throw new Error(error);
    }
  }
)

module.exports = {createBrand,updateBrand,getAllBrand,getBrand,deleteBrand}
