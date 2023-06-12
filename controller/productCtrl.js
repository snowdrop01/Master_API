const Product = require('../models/productModel')
const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify');
const fs = require("fs");
const { validateMongoID } = require('../utils/validateMondoDBId');
const {
  cloudinaryUploadImg,
} = require('../utils/cloudnairy');

const createProduct = asyncHandler(
  async (req,res) => {
    try{
      if(req.body.title){
        req.body.slug = slugify(req.body.title);
      }
    const product = await Product.create(req.body)
    res.json(product);
    }catch(error){
    throw new Error(error);
    }
  }
)

const getProduct = asyncHandler(
  async (req,res) => {
    try{
    const product = await Product.findById(req.params.id)
    res.json(product)
    }catch(error){
    throw new Error(error);
    }
  }
)

const getAllProduct = asyncHandler(
  async (req,res) => {
    try{
      //Filtering
    const queryObj = {...req.query}
    const excludeFields = ["page","sort","limit","fields"];

    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    
    let query = Product.find(JSON.parse(queryStr));
    
    //Sorting

    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(" ");
        query = query.sort(sortBy);
    }else{
        query = query.sort('-createdAt');
    }
    
    //limiting the fields

    if(req.query.fields){
      const fields = req.query.fields.split(',').join(" ");
      query = query.select(fields);
    }else{
      query = query.select('-__v');
    }

    //Pagination

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page-1)*limit;
    query = await query.skip(skip).limit(limit);
    if(req.query.page){
      const productCount = await Product.countDocuments();
      if(skip >= productCount){
        throw new Error("This page is not exit");
      }
    }

    const products = await query;
    res.json(products)
     }catch(error){
    throw new Error(error);
    }
  }
)

const updateProduct = asyncHandler(
  async (req,res) => {
    try{
      if(req.body.title){
        req.body.slug = slugify(req.body.title);
      }
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(id,req.body,{ new: true});
    res.json(product)
    }catch(error){
    throw new Error(error);
    }
  }
)

const deleteProduct = asyncHandler(
 async (req,res) => {
   try{
     const id = req.params.id;
     const product = await Product.findByIdAndDelete(id);
     res.json(product);
      }catch(error){
    throw new Error(error);
    }
 }
)

const addToWishlist = asyncHandler(
  async (req,res) => {
    try{
        const {_id} = req.user;
        const {prodId} = req.body;

        const user = await User.findById(_id);
        const alreadyAdded = user.wishlist.find( (id) => id.toString() === prodId);

        if(alreadyAdded){
          const user = await User.findByIdAndUpdate(_id, { $pull : { wishlist : prodId }} , { new : true})
          res.json(user);
        }else{
          const user = await User.findByIdAndUpdate(_id, { $push : { wishlist : prodId }} , { new : true})
          res.json(user);
        }

    }catch(error){
      throw new Error(error);
    }
  }
)

const rating = asyncHandler(
   async (req,res) => {
    try{
       const {_id} = req.user;
       const {star,prodId,comment} = req.body;

       const product = await Product.findById(prodId)
       const alreadyRated = product.ratings.find( (userId) => userId.postedBy.toString() === _id.toString());

       if(alreadyRated){
          const updateRating = await Product.updateOne(
            { ratings: { $elemMatch: alreadyRated }},
            { $set: { "ratings.$.star": star}},
            {new: true}
          )
          //res.json(updateRating)
       }else{
           const product = await Product.findByIdAndUpdate(
            prodId,
            { $push : { ratings : { star : star,  comment: comment, postedBy : _id }}},
            {new : true}
           )

           //res.json(product)
       }
    
       const getallratings = await Product.findById(prodId);
       const totalRatings = getallratings.ratings.length;
       const sum = getallratings.ratings.map((item) => item.star).reduce(
        function (result, item) {
          return result + item;
        }, 0
       )
       
       const actualRating = Math.round( sum/totalRatings);
       const finalProduct = await Product.findByIdAndUpdate(prodId, { totalRating : actualRating }, { new: true})
       res.json(finalProduct);

    }catch(error){
      throw new Error(error);
    }
   }
)

const uploadImages = asyncHandler(
  async (req,res) => {
    try {
      const uploader = (path) => { cloudinaryUploadImg(path, "images"); }
      const urls = [];
      const files = req.files;
      for (const file of files) {        
        const { path } = file;
        const newpath = await uploader(path);
        //console.log(newpath);
        urls.push(newpath);
        fs.unlinkSync(path);
      }
      const images = urls.map((file) => {
        return file;
      });
      res.json(images);
    } catch (error) {
      throw new Error(error);
    }
  }
)



//add filter and sorting in progress
module.exports = { createProduct, getProduct,getAllProduct,updateProduct,deleteProduct,addToWishlist,rating, uploadImages}
