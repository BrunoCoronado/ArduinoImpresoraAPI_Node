const http = require('http');
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const webServerConfig = require('../config/web-server');
const router = require('./router');
const fs = require('fs');
const rimraf = require("rimraf");
let httpServer;

function initialize(){
    return new Promise((resolve, reject) =>{
        //if (!fs.existsSync("assets/impresiones"))
            //fs.mkdirSync("assets/impresiones");
        const app = express();
        app.options('*', cors())
        app.use( (req, res, next) => { res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); next(); });
        httpServer = http.createServer(app);
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json());
        app.use(morgan('dev'));
        app.use('/impresoraArduino/api/', router);
        httpServer.listen(webServerConfig.port)
        .on('listening', () =>{
            console.log(`Servidor iniciado, escuchando en el puerto ${webServerConfig.port}`);
            resolve();
        })
        .on('error', error => {
            reject(error);
        });
    });
}

function close(){
    return new Promise((resolve, reject) => {
        httpServer.close(err =>{
            //rimraf.sync("assets/impresiones");
            if(err)
                return reject(err);
            resolve();
        });
    });
}

module.exports.initialize = initialize;
module.exports.close = close;