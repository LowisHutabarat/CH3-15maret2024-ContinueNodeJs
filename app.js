
const express = require('express');
const morgan = require("morgan");

const app = express();

const customerRouter = require('./routes/customerRouter')

//middleware untuk membaca json dari request body ke kita
app.use(express.json())

//middleware third party
app.use(morgan('dev'));

//Middleware buatan
app.use((req, res, next) => {
    console.log('Hello World, middleware sendiri..');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});


const defaultRouter = (req, res, next) => {
    res.send("<h1>Hello World</h1>");
};


// app.get('/', defaultRouter );
// banyak data

app.use('/api/v1/customers',customerRouter);


module.exports = app;