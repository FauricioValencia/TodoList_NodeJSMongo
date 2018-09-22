const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose =require ('mongoose');
const { MongoClient } = require("mongodb");

const app = express();

//connecting to db
MongoClient.connect('mongodb://localhost/crud-mongo',{ useNewUrlParser: true })
    .then((db)=>{
        console.log('db connectd');
    })
    .catch((error)=>console.log(error))
//importando rutas
const indexRoutes =require('./routes/index');
//settings
app.set('port', process.env.PORT || 3000);
// app.set('views',__dirname+'/views');
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
//routes
app.use('/',indexRoutes);
app.use(express.urlencoded( {extended:false })); //entender el json que envia el formulario
//starting server
app.listen(app.get('port'),()=>{
    console.log(`server on port ${app.get('port')}`);
});