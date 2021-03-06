var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
const cors = require('cors');
var indexRouter = require('./routes/api/index');
var usersRouter = require('./routes/api/user');




var app = express();
require('dotenv').config();
//mongoose database connect

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  console.log("connected", err?fasle:true)
}) 
// 'mongodb://localhost/fs'


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/user', usersRouter);

module.exports = app;
