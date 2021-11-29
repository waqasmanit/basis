const express = require('express');
const path = require('path');

const app = express();
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

const signupRouter = require('./router/signupRouter');
const postRouter = require('./router/postRouter')


//for embedding body object to req object
app.use(express.json({ limit: '10kb' }));

//data sanitization against NoSql query injection
app.use(mongoSanitize());

//Data sanitization against xss
app.use(xss());




//used for limiting request made by same client,helps in avoiding brute force attack
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'TO many request from this ip, try again in an hour !!',
});
app.use('/api', limiter);


//Route handler
app.use('/OTP', signupRouter);
app.use('/post', postRouter);


module.exports = app;