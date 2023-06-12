const expess = require('express')
const {createCoupan,updateCoupan,getAllCoupan,getCoupan,deleteCoupan} = require('../controller/coupanCtrl')
const route = expess.Router()
const {authMiddleware,isAdminMiddleware} = require('../middleware/authMiddleware')

route.post('/createCoupan',authMiddleware,isAdminMiddleware,createCoupan);
route.post('/updateCoupan/:id',authMiddleware,isAdminMiddleware,updateCoupan);
route.delete('/deleteCoupan/:id',authMiddleware,isAdminMiddleware,deleteCoupan);
route.get('/getCoupan/:id',getCoupan);
route.get('/getCoupan',getAllCoupan);

module.exports = route