var express = require('express');
var router = express.Router();
const fs = require('fs');


/**
 * GET estado direccion
 */
router.route('/:listaValor')
    .get(function (req, res, next) {
        let listaValor = req.params.listaValor;
        let url = `./public/assets/dummy-files/lista-valor/${listaValor}.json`;
        let jsonData = fs.readFileSync(url);
        let response = JSON.parse(jsonData);
        res.send(response);
    });

module.exports = router;