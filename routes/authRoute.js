const express = require('express')
const router = express.Router();
const {creteUser, loginUser,getallUsers, getUser, deleteUser, updateUser, handleRefreshToken, logoutUser, updatePassword, forgotPassword, resetPassword, loginAdmin, userCart,getUserCart,emptyCart,applyCoupon,saveAddress,createOrder,getAllOrders,getOrders,getOrderByUserId,updateOrderStatus} = require('../controller/userCtrl')
const {authMiddleware, isAdminMiddleware} = require('../middleware/authMiddleware')

router.post("/register", creteUser)
router.post("/login",loginUser)
router.post("/admin-login",loginAdmin)
router.get("/allUsers",getallUsers);
router.get("/getUser",authMiddleware,getUser);
router.delete("/deleteUser",authMiddleware,deleteUser);
router.patch("/updateUser", authMiddleware,isAdminMiddleware,updateUser);
router.get("/refresh",handleRefreshToken)
router.get("/logout", logoutUser)
router.patch('/password',authMiddleware,updatePassword);
router.patch('/forgotPaasword',forgotPassword)
router.patch("/resetPassword:token",resetPassword)
router.patch("/saveAddress", authMiddleware,saveAddress);

//cart    
router.post("/user-cart",authMiddleware,userCart);
router.get("/get-user-cart",authMiddleware,getUserCart);
router.patch("/apply-coupan",authMiddleware,applyCoupon)
router.delete("/remove-cart",authMiddleware,emptyCart);

//Order
router.post("/create-order",authMiddleware,createOrder)
router.get("/get-order",authMiddleware,getOrders)
router.get("/get-all-order",authMiddleware,getAllOrders)
router.get("/get-order/:id",authMiddleware,getOrderByUserId)
router.patch("/update-order-status",authMiddleware,updateOrderStatus)

module.exports = router
