const express = require("express");
const path = require("path");
const mongoose = require('mongoose');

const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const api = require("./routes/index")
const {handleError} = require("./helpers/utils.helper");
require("dotenv").config();
var app = express();

app.use(cors());
////mongodb connection
var MONGODB_URL = `mongodb://${process.env.USER_ROOT_DATABASE}:${process.env.PASSWORD_ROOT_DATABASE}@localhost:${process.env.PORT_DATABASE}/train_c`;
mongoose.connect(MONGODB_URL, {useNewUrlParser:true, useUnifiedTopology: true,authSource:'admin'})
	.then(()=>{
		if (process.env.NODE_ENV !== 'production'){
			console.log('Connected to %s \n',MONGODB_URL);
		}
	})
	.catch((err)=>{
		console.error('Mongodb starting error: ',err);
		process.exit(1);
	});
//
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/api', api);
app.use(function (req,res,next){
	res.status(404).send('Unable to find the requested resource!');
});
app.use(handleError);
module.exports = app;
