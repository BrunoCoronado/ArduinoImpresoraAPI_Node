const express = require('express');
const router = new express.Router();

const imagen = require('../controllers/imagen');

const  multipart  =  require('connect-multiparty');
const multipartMiddlewareUsers = multipart({
    uploadDir: './assets/impresiones'
});

router.route('/imagen')
    .get(imagen.get)
    .post(multipartMiddlewareUsers, imagen.post);

module.exports = router;