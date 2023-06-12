const expess = require('express')
const {createBlog,getBlog,getAllBlogs,updateBlog,deleteBlog,uploadImages} = require('../controller/blogCtrl')
const route = expess.Router()
const { uploadPhoto, blogImgResize } = require('../middleware/uploadImages')
const {authMiddleware,isAdminMiddleware} = require('../middleware/authMiddleware')

route.post('/createBlog',authMiddleware,isAdminMiddleware,createBlog);
route.get('/getBlog/:id',getBlog);
route.get('/getAllBlogs',getAllBlogs);
route.patch('/updateBlog/:id',authMiddleware,isAdminMiddleware,updateBlog);
route.delete('/deleteBlog/:id',authMiddleware,isAdminMiddleware,deleteBlog);
route.patch('/upload/:id',authMiddleware,isAdminMiddleware,uploadPhoto.array("images", 10),
                          blogImgResize,uploadImages)

module.exports = route