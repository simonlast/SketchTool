var express = require('express')

var app = express();

var cache = {};

app.configure( function(){
  app.use(express.static(__dirname + '/lib'));
  app.use(express.errorHandler());
});

app.listen(80);