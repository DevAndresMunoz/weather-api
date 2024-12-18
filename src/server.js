const express = require('express');
require('dotenv').config();
const cors = require('cors')
const products = require('./products.js');
const { faker } = require("@faker-js/faker");
const app = express();
app.use(cors({}))

app.get("/products", (req, res) => {
    res.json("proof of life")
})
