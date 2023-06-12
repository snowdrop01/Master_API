const BlogCategory = require('../models/blogCatModel')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify');
const { validateMongoID } = require('../utils/validateMondoDBId');

const createCategory = asyncHandler(
  async (req,res) => {
    try{
      const category = await BlogCategory.create(req.body)
      res.json(category)
    }catch(error){
      throw new Error(error);
    }
  }
)

const updateCategory = asyncHandler(
  async (req,res) => {
    try{
      const category = await BlogCategory.findByIdAndUpdate(req.params.id, req.body, {new:true})
      res.json(category)
    }catch(error){
      throw new Error(error);
    }
  }
)

const deleteCategory = asyncHandler(
  async (req,res) => {
    try{
      const category = await BlogCategory.findByIdAndDelete(req.params.id)
      res.json(category)
    }catch(error){
      throw new Error(error);
    }
  }
)

const getCategory = asyncHandler(
  async (req,res) => {
    try{
      const category = await BlogCategory.findById(req.params.id)
      res.json(category)
    }catch(error){
      throw new Error(error);
    }
  }
)

const getAllCategory = asyncHandler(
  async (req,res) => {
    try{
      const category = await BlogCategory.find();
      res.json(category)
    }catch(error){
      throw new Error(error);
    }
  }
)

module.exports = {createCategory,updateCategory,getAllCategory,getCategory,deleteCategory}
