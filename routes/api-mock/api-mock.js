var express = require('express');
var restapi = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./public/assets/taurus-mock-inception.db');

/**
 * GET all endpoint
 */
restapi.get('/', function (req, res, next) {
    console.log("Obteniendo todos los endpoints");
    try {
        let sql = "select * from endpoint;";
        if (req.query.criteria) {
            sql = sql + " and lower(e.request_method) = '" + req.query.criteria.toLowerCase() + "'";
        }
        let response = [];
        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                let item = {};
                item.requestMethod = row.request_method;
                item.responseHttpCode = row.status_code;
                item.contentType = row.content_type;
                item.output = row.json;
                item.active = row.active;
                item.description = row.description;
                item.path = row.path;
                item.id = row.id;
                response.push(item);
            });
            res.send(response).status(200);
        });
    } catch (err) {
        next(err);
    }
});

restapi.post('/', function (req, res, next) {
    try {
        console.log(req.body);
        let sql = "insert into endpoint values(null,?,?,?,?,?,?,?,?)";
        db.run(sql,
            req.body.requestMethod.toUpperCase(),
            req.body.path,
            req.body.output,
            req.body.responseHttpCode,
            1,
            req.body.description,
            req.body.contentType,
            '', (err, row) => {
                if (err) {
                    res.status(500);
                } else {
                    res.status(201);
                }
                res.end();
            });
    } catch (err) {
        console.log(err);
        next(err)
    }
});

restapi.put('/:id', function (req, res, next) {
    try {
        console.log(req.body);
        console.log(req.params);
        let sql = "UPDATE endpoint set request_method=?, path=?, json=?, status_code=?, active=?, description=?, content_type=? where id=?;";
        db.run(sql,
            req.body.requestMethod.toUpperCase(),
            req.body.path,
            req.body.output,
            req.body.responseHttpCode,
            req.body.active,
            req.body.description,
            req.body.contentType,
            req.body.id,
            (err, row) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    res.status(200);
                }
                res.end();
            });
    } catch (err) {
        res.status(500).send(err);
    }
});

restapi.put('/:id/active', function (req, res, next) {
    try {
        console.log("Eliminción lógica del mock => " + req.params.id);
        let sql = "UPDATE endpoint set active=? where id=?;";
        db.run(sql, req.body.active, req.params.id, (err, row) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    res.status(200);
                }
                res.end();
            });
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = restapi;