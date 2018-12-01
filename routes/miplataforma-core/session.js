var express = require('express');
var router = express.Router();
const fs = require('fs');

const URL_TOKEN = '/jwt-service/jwt/token/';
const URL_INFO_CLIENTE = '/info-cliente/cliente/datosfull/session/';
const URL_PERFIL_USUARIO = '/perfil-usuario/perfil/usuario/session';

/**
 * GET jwt token
 */
router.route(URL_TOKEN)
    .get(function (req, res, next) {
        let jsonData = fs.readFileSync('./public/assets/dummy-files/miplataforma-core/jwt-token.json');
        let jwtToken = JSON.parse(jsonData);
        res.send(jwtToken);
    });

/**
 * GET info cliente
 */
router.route(URL_INFO_CLIENTE)
    .get(function (req, res, next) {
        let jsonData = fs.readFileSync('./public/assets/dummy-files/miplataforma-core/info-cliente.json');
        let response = JSON.parse(jsonData);
        res.send(response);
    });

/**
 * GET perfil usuario
 */
router.route(URL_PERFIL_USUARIO)
    .get(function (req, res, next) {
        let jsonData = fs.readFileSync('./public/assets/dummy-files/miplataforma-core/perfil-usuario.json');
        let response = JSON.parse(jsonData);
        res.send(response);
    });


module.exports = router;