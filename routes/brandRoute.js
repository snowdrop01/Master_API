const expess = require('express')
const {createBrand,updateBrand,getAllBrand,getBrand,deleteBrand} = require('../controller/brandCtrl')
const route = expess.Router()
const {authMiddleware,isAdminMiddleware} = require('../middleware/authMiddleware')

route.post('/createBrand',authMiddleware,isAdminMiddleware,createBrand)
route.patch('/updateBrand/:id',authMiddleware,isAdminMiddleware,updateBrand)
route.delete('/deleteBrand/:id',authMiddleware,isAdminMiddleware,deleteBrand)
route.get('/getBrand/:id',getBrand)
route.get('/getBrand',getAllBrand)

module.exports = route
