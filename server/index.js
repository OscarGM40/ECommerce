require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Inicializaciones
const app = express();
require('./databases/connection');
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cors());

// Routes
app.use("/api/users", require('./routes/user.routes'));
app.use("/api/auth", require('./routes/auth.routes'));
app.use("/api/products", require('./routes/product.routes'));
app.use("/api/carts", require('./routes/cart.routes'));
app.use("/api/orders", require('./routes/order.routes'));
app.use("/api/checkout", require('./routes/stripe.routes'));


app.listen(process.env.API_PORT || 8000, () => {
    console.clear();
    console.log(`Server Express en puerto ${process.env.API_PORT}`)
})
