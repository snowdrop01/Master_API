const expess = require('express')
const { createProduct, getProduct, getAllProduct, updateProduct, deleteProduct,addToWishlist,rating, uploadImages} = require('../controller/productCtrl')
const { uploadPhoto, productImgResize } = require('../middleware/uploadImages')
const route = expess.Router()
const {authMiddleware,isAdminMiddleware} = require('../middleware/authMiddleware')

route.post('/createproduct',authMiddleware,isAdminMiddleware, createProduct)
route.get('/getproduct/:id', getProduct)
route.get('/getallproduct', getAllProduct)
route.patch('/updateProduct/:id',authMiddleware,isAdminMiddleware, updateProduct)
route.delete('/deleteProduct/:id',authMiddleware,isAdminMiddleware, deleteProduct)
route.patch('/addToWishlist',authMiddleware, addToWishlist)
route.patch('/rating',authMiddleware, rating)
route.patch('/upload/:id',authMiddleware,isAdminMiddleware,uploadPhoto.array("images", 10),
                          productImgResize,uploadImages)

module.exports = route