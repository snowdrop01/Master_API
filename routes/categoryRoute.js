const expess = require('express')
const {createCategory,updateCategory,getAllCategory,getCategory,deleteCategory} = require('../controller/categoryCtrl')
const route = expess.Router()
const {authMiddleware,isAdminMiddleware} = require('../middleware/authMiddleware')

route.post('/createCategory',authMiddleware,isAdminMiddleware,createCategory)
route.patch('/updateCategory/:id',authMiddleware,isAdminMiddleware,updateCategory)
route.delete('/deleteCategory/:id',authMiddleware,isAdminMiddleware,deleteCategory)
route.get('/getCategory/:id',getCategory)
route.get('/getCategory',getAllCategory)

module.exports = route