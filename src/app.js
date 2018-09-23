const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose =require ('mongoose');

// CASI NO SE USA PARA ESO ESTA EL MONGOOSE
// const { MongoClient } = require("mongodb");

const app = express();

//importando rutas
const indexRoutes =require('./routes/index');
//settings
app.set('port', process.env.PORT || 3000);
// app.set('views',__dirname+'/views');
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(express.json());
app.use(express.urlencoded( {extended:false })); //entender el json que envia el formulario
app.use(morgan('dev'));
//routes
app.use('/',indexRoutes);

//connecting to db
mongoose.set('useCreateIndex', true);
// siempre debes expecificar el puerto por donde va mongo por buena practica
mongoose.connect('mongodb://localhost:27017/crud-mongo',{ useNewUrlParser: true })
    .then((db)=>{
        console.log('db connectd');
        //starting server
        return app.listen(app.get('port'),()=>{
            console.log(`server on port ${app.get('port')}`);
});

    })
    .catch((error)=>console.log(error))