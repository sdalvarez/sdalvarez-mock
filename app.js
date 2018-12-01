var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Required
var admin = require('./routes/admin');
var miplataformaCore = require('./routes/miplataforma-core/session');
var listaValor = require('./routes/lista-valor/lista-valor');
var mock = require('./routes/mock/mock');
var apiMock = require('./routes/api-mock/api-mock');
var home = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

//Routes
app.use('/admin', admin);
app.use('/api/mocks', apiMock);
//app.use('/miplataforma-core', miplataformaCore);
//app.use('/miplataforma/ficha-cliente-utilidades-rest/common/datos-generales', listaValor);
//app.use('/', home);

app.use('/', mock);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("Retornando 404");
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
