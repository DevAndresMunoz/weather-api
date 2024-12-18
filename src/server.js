require('dotenv').config();
const express = require('express');
const products = require('./products.js');
const { faker } = require("@faker-js/faker");
const app = express();

