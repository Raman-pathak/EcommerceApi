const express = require('express');
const { placeOrder, getorderHistory, getOrderDetails, updateOrderStatus } = require('../controller/order.controller');
const orderRouter = express.Router()

// Place Order by User
orderRouter.post("/place-order", placeOrder)

// User Can see Order History
orderRouter.get('/order-history', getorderHistory)

// Get Order Details by OrderID
orderRouter.get('/order-details/:orderID', getOrderDetails)

//update Order Status by OrderID
orderRouter.patch('/update/:orderID', updateOrderStatus)

module.exports = { orderRouter }
