const Category = require('../models/categoryModel')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify');
const { validateMongoID } = require('../utils/validateMondoDBId');

const createCategory = asyncHandler(
  async (req,res) => {
    try{
      const category = await Category.create(req.body)
      res.json(category)
    }catch(error){
      throw new Error(error);
    }
  }
)

const updateCategory = asyncHandler(
  async (req,res) => {
    try{
      const category = await Category.findByIdAndUpdate(req.params.id, req.body, {new:true})
      res.json(category)
    }catch(error){
      throw new Error(error);
    }
  }
)

const deleteCategory = asyncHandler(
  async (req,res) => {
    try{
      const category = await Category.findByIdAndDelete(req.params.id)
      res.json(category)
    }catch(error){
      throw new Error(error);
    }
  }
)

const getCategory = asyncHandler(
  async (req,res) => {
    try{
      const category = await Category.findById(req.params.id)
      res.json(category)
    }catch(error){
      throw new Error(error);
    }
  }
)

const getAllCategory = asyncHandler(
  async (req,res) => {
    try{
      const category = await Category.find();
      res.json(category)
    }catch(error){
      throw new Error(error);
    }
  }
)

module.exports = {createCategory,updateCategory,getAllCategory,getCategory,deleteCategory}