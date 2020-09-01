var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
require('dotenv').config();
var app = express();
//connect & test database
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.USER_ROOT_DATABASE}:${process.env.PASSWORD_ROOT_DATABASE}@localhost:${process.env.PORT_DATABASE}/train_c`, {useNewUrlParser: true, useUnifiedTopology: true,authSource:'admin'});

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'asdasd' });
kitty.save().then(() => console.log('meow'));
//
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
