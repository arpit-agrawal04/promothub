var express = require('express');
var router = express.Router();
var addOrder = require('../controller/addOrder')
var delivery = require('../controller/delivery')
var isAuth = require('../auth/auth').isAuth
/* GET users listing. */
router.post('/getBasicAdd',isAuth,addOrder.getBasicAdd);
router.post('/SignStaffUser',isAuth,addOrder.SignStaffUser);
router.post('/addOrder',isAuth,addOrder.addOrder);
router.post('/findCustomer',isAuth,addOrder.findCustomer);
router.post('/getCompleteStaffDetails',isAuth,addOrder.getCompleteStaffDetails);
router.post('/getStaffComp',isAuth,addOrder.getStaffComp);
router.post('/UpdateStaffUser',isAuth,addOrder.UpdateStaffUser);
router.post('/GetAllCustomers',isAuth,addOrder.GetAllCustomers);
router.post('/GetAllOrders',isAuth,addOrder.GetAllOrders);
router.post('/infoToEditOrder',isAuth,addOrder.infoToEditOrder);
router.post('/deleteOrder',isAuth,addOrder.deleteOrder);
router.post('/deleteOrder',isAuth,addOrder.deleteOrder);
router.post('/todayDeliveryTask',isAuth,delivery.todayDeliveryTask);
router.post('/cancelOrder',isAuth,delivery.cancelOrder);
router.post('/rescheduleOrder',isAuth,delivery.rescheduleOrder);
router.post('/deliveryBoyReached',isAuth,delivery.deliveryBoyReached);
router.post('/deliveryUpdate',isAuth,delivery.deliveryUpdate);
module.exports = router;
