const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient

require("dotenv").config();

const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');

const app = express();

async function init() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected!");
    } catch (error) {
        console.log(error);
    }
}

init();

app.use(cors())
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);

module.exports = app;
