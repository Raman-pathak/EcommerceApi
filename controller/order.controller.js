const { sendEmail } = require("../mailer/nodemailer")
const { CartModel } = require("../models/cart.model")
const { OrderModel } = require("../models/order.model")
const { UserModel } = require("../models/user.model")

const placeOrder = async (req, res) => {
    try {
        const userID = req.userID

        const cart = await CartModel.findOne({ userID }).populate('products.product')
        // Checking the cart is Empty or Not
        if (!cart || cart.products.length == 0) {
            return res.status(400).json({ msg: "Cannot Place Order,cart is Empty", success: false })
        }

        // calculating the total Order Price
        const totalPrice = cart.products.reduce((Total, curr) => {
            return Total + curr.quantity * curr.product.price
        }, 0)

        // Creating New Order
        const newOrder = new OrderModel({
            user: userID,
            items: cart.products.map((ele) => {
                return {
                    product: ele.product._id,
                    quantity: ele.quantity
                }
            }),
            total: totalPrice.toFixed(2),
            orderStatus: {
                status: "Pending",
                description: "Order Placed Succesfully"
            }

        })
        await newOrder.save()

        // making cart empty after order Placed
        cart.products = []
        await cart.save()
        //for email
        const userData = await UserModel.findById(userID);
        // Send an order confirmation email

        const emailData = {
            email: userData.email,
            subject: 'Order Confirmation - Triveous Ecommerce',
            body: `
          <html>
            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
              <h2>Order Confirmation</h2>
              <p>Dear ${userData.username},</p>
              <p>Your order has been successfully placed with Triveous Ecommerce. Below are the order details:</p>
              <ul>
               <li>status: ${newOrder.orderStatus.status}</li> 
               <li>Description: ${newOrder.orderStatus.description}</li> 
               <li>Time: ${newOrder.orderStatus.timestamp.toLocaleTimeString()}</li> 
             
               <li><h3>Your Total Amount is <b> ${newOrder.total} </b> </h3></li>
              </ul>
              <p>Thank you for shopping with us!</p>
              <p>Best regards,</p>
              <p>The Triveous Ecommerce Team</p>
            </body>
          </html>
        `,
        };

        // Send the order confirmation email
        sendEmail(emailData);
        return res.status(200).json({ msg: "Order Placed Succesfully", success: true, data: newOrder })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Unable to Place Order,Server Error',
            msg: error.message
        })
    }
}

//get order history find method 
const getorderHistory = async (req, res) => {
    try {
        const userID = req.userID
        const data = await OrderModel.find({ user: userID }).populate('items.product')
        if (!data) {
            return res.status(404).json({ msg: "Order Details Not Found", success: false })
        }
        return res.status(200).json({ data, success: true })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            msg: error.message
        })
    }
}
//get order  deatils 
const getOrderDetails = async (req, res) => {
    try {
        const { orderID } = req.params
        const userID = req.userID
      
        const OrderPresent = await OrderModel.findOne({user: userID, _id: orderID}).populate('items.product')

        if (!OrderPresent) {
            return res.status(404).json({msg: "Order Not Found"})
        }

        return res.status(200).json({ data: OrderPresent, success: true })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            msg: error.message
        })
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const { orderID } = req.params
        const { status } = req.body
        const order = await OrderModel.findById(orderID)
        if (!order) {
            return res.status(400).json({ msg: "Order Not Found , Please Try Again", success: false })
        }
        order.orderStatus.status = status
        await order.save()
        return res.status(200).json({ msg: "Status Updated Succesfully", success: true, data: order })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            msg: error.message
        })
    }
}

module.exports = { placeOrder, getorderHistory, getOrderDetails, updateOrderStatus }