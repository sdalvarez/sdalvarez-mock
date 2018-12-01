var express = require('express');
var restapi = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./public/assets/taurus-mock-inception.db');


/**
 * json
 */
restapi.all('/*', function (req, res, next) {
    console.log("Ejecutando mock dinamico");
    console.log("Path ==> " + req.originalUrl);
    if (req.originalUrl == "/") {
        console.log("Redireccionando a página del home");
        res.render('home', { title: 'Express' });
    }
    if (req.originalUrl == "/contact") {
        console.log("Redireccionando a página del contact");
        res.render('contact', { title: 'Express' });
    }

    let query = "select e.json, e.body_structure from endpoint e where e.active=1 and e.path like '" + req.originalUrl + "' and e.request_method = '" + req.method + "' ";

    try {
        db.get(query, function (err, row) {
            if (err) {
                console.error(err);
                res.status(500).send(err);
            } else {

                if (row) {
                    //validamos la estructura del body
                    let status = 200;
                    let response = null;
                    if (req.method != 'GET') {
                        let result = validateBody(row.body_structure, req.body);
                        if (!result.valid) {
                            status = 500;
                            response = result;
                        } else {
                            response = row.json;
                        }
                    } else {
                        if (!isValidJson(row.json)) {
                            response = {data: "La salida del json es inválida"};
                            status = 500;
                        }else{
                            response = JSON.parse(row.json);                        
                        }
                    }
                    res.status(status).json(response);
                } else {
                    res.status(204);
                }
            }
            res.end();
        });

    } catch (error) {
        res.status(500);
        res.send(err);
    }

});

function validateBody(bodyStructure, body) {
    var response = getResponseObject();

    if (bodyStructure) {
        bodyStructure = JSON.parse(bodyStructure);
        for (let index = 0; index < bodyStructure.length; index++) {
            const element = bodyStructure[index];
            let value = findInKeys(element.attr, body);
            if (value != "mock_1234567989_inception") {
                let validation = validateElement(element, value);
                if (!validation.valid) {
                    response.valid = validation.valid;
                    response.message = validation.message;
                    break;
                }
            } else {
                response.valid = false;
                response.message = "Contrato inválido, no se encontró elemento:  " + element.attr;
                break;
            }
        }
        return response;

    } else {
        return response;
    }

}

function findInKeys(name, body) {
    let value = "mock_1234567989_inception";
    Object.keys(body).forEach(function (key) {
        if (key == name) {
            value = body[key];
            return;
        }
    });
    return value;
}

function validateElement(element, value) {
    let response = getResponseObject();
    if (element.required) {
        if (value == null || value == "") {
            response.valid = false;
            response.message = element.message;
            console.log("set response valid: " + response.valid);
        }
    }
    return response;
}

function getResponseObject() {
    return {
        valid: true,
        message: "Validacion exitosa"
    };
}

function isValidJson(json) {  
    try {
        JSON.parse(json);
        return true;
    } catch (e) {
        return false;
    }
}

module.exports = restapi;