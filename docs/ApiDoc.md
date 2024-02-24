# API Documentation

## Welcome Route

| Route           | Endpoint | Description                            | Features          |
| --------------- | -------- | -------------------------------------- | ----------------- |
| Welcome Message | GET /    | Provides a welcome message to the API. | - Welcome message |

## Swagger Docs

| Route           | Endpoint  | Description                       | Features          |
| --------------- | --------- | --------------------------------- | ----------------- |
| Welcome Message | GET /docs | Provides a Documentation for API. | - Welcome message |

## Users

| Route         | Endpoint       | Description                                       | Features                    |
| ------------- | -------------- | ------------------------------------------------- | --------------------------- |
| Register User | POST /register | Register a new user with provided credentials.    | - User registration         |
| Login User    | POST /login    | Authenticate and log in a user with JWT token.    | - User login with JWT token |
| Logout User   | POST /logout   | Blacklist the token to log out the user securely. | - Secure token blacklisting |

## Products

| Route                    | Endpoint                      | Description                                         | Features                       |
| ------------------------ | ----------------------------- | --------------------------------------------------- | ------------------------------ |
| Add New Product          | POST /create                  | Add a new product to the catalog.                   | - Product creation             |
| Get All Products         | GET /get                      | Retrieve a list of all products with rate limiting. | - Rate-limited product listing |
| Get Product by ID        | GET /get/:productID           | Retrieve product details by product ID.             | - Product details by ID        |
| Get Products by Category | GET /get/category/:categoryID | Retrieve products by category ID.                   | - Filter products by category  |
| Update Product           | PUT /update/:productID        | Update product information by product ID.           | - Product information update   |
| Delete Product           | DELETE /delete/:productID     | Delete a product by product ID.                     | - Product deletion             |

## Categories

| Route               | Endpoint                        | Description                                 | Features                      |
| ------------------- | ------------------------------- | ------------------------------------------- | ----------------------------- |
| Create New Category | POST /create                    | Create a new product category.              | - Category creation           |
| Get All Categories  | GET /get                        | Retrieve a list of all categories.          | - List all categories         |
| Get Category by ID  | GET /get/:categoryID/particular | Retrieve category details by category ID.   | - Category details by ID      |
| Update Category     | PUT /update/:categoryID         | Update category information by category ID. | - Category information update |
| Delete Category     | DELETE /delete/:categoryID      | Delete a category by category ID.           | - Category deletion           |

## Cart

| Route               | Endpoint                    | Description                                                   | Features                        |
| ------------------- | --------------------------- | ------------------------------------------------------------- | ------------------------------- |
| Add Product to Cart | POST /addtocart/:productID  | Add a product to the user's shopping cart by product ID.      | - Product added to cart         |
| Get User Cart Items | GET /get                    | Retrieve all items in the user's shopping cart.               | - List all items in the cart    |
| Increment Quantity  | PATCH /increment/:productID | Increment the quantity of a cart product by product ID.       | - Quantity increment            |
| Decrement Quantity  | PATCH /decrement/:productID | Decrement the quantity of a cart product by product ID.       | - Quantity decrement            |
| Remove Product      | DELETE /delete/:productID   | Remove a product from the user's shopping cart by product ID. | - Product removal from the cart |

## Orders

| Route               | Endpoint                    | Description                                      | Features              |
| ------------------- | --------------------------- | ------------------------------------------------ | --------------------- |
| Place Order         | POST /place-order           | Allow users to place orders.                     | - Order placement     |
| Order History       | GET /order-history          | Retrieve the order history for a user.           | - View order history  |
| Order Details       | GET /order-details/:orderID | Retrieve detailed order information by order ID. | - View order details  |
| Update Order Status | PATCH /update/:orderID      | Update the order status by order ID.             | - Order status update |

```javascript
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome to e-commerce webside " });
});
```