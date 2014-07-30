
/**
 * Module dependencies.
 */

//require mongoose setup
require('./db');

var express = require('express');
var routes = require('./routes/index');
var hello = require('./routes/hello'); // hello world
var user = require('./routes/user');
var form = require('./routes/form')
var http = require('http');
var path = require('path');

// create new express instance
var app = express();

// all environments (mostly middleware)
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// routes
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/helloworld', hello.helloWorld); // hello world
// app.get('/route_name', variable.function); // the varible will reference a js file
app.get('/form', form.myForm);
app.post('/create', form.create);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
