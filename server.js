require('dotenv').config()
const express = require("express");
const cors = require("cors")

const app = express();

// JSON
app.use(express.json());

// Cors
app.use(cors());

module.exports = app;