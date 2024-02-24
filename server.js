const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const {Connection} = require('./config/db');
const {authenticate} = require('./middleware/auth.middleware')
const {userRouter}  = require('./routes/user.routes')
const {productRouter} = require('./routes/product.routes');
const { categoryRouter } = require('./routes/category.routes');
const { cartRouter } = require('./routes/cart.routes');
const { orderRouter } = require('./routes/order.routes');

const cors = require('cors');
//create a express app 
const app = express();
app.use(cors())
app.use(express.json())
require('dotenv').config();
const PORT = process.env.PORT || 3001

// Swagger 

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Ecommerce Backend assignment ",
            version: "1.0.0",
            description:
                "I've built a user-friendly E-commerce API featuring essential actions like registration, login, product viewing, cart management, secure order placement, and order history tracking. Our system ensures data security with authentication and maintains stability with a rate limiter. Leveraging Node.js, MongoDB, Express, and JavaScript, we meet industry standards for a seamless shopping experience.",
        },
        servers: [
            {
                url: "http://localhost:3001",
            },
        ],
    },
    apis: ["./docs/*.js"],
};
const specs = swaggerJsDoc(options);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

//Home routes 

app.get('/',(req,res) => {
    res.send('welcome to my e-commerce ');
})
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/category', categoryRouter)

app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.use(authenticate)

//Database and server starting point 

app.listen(PORT, async () => {
    try {
        await Connection
        console.log("Database Connected Sucessfully");

    } catch (error) {
        console.log("Database Connection Error", error.message);
    }
    console.log(`Server Connected to Port: ${PORT}`);
})