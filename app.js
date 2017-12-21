var express = require('express');
var app = express();
var url = 'mongodb://vjtest:vj1234@ds143559.mlab.com:43559/todolistvj';
// mongodb://<dbuser>:<dbpassword>@ds143559.mlab.com:43559/todolistvj
var mangoose = require('mongoose');
// var config = require('./config');	
var setupController = require('./controller/setupController');
var apiController = require('./controller/apiController');
	
var port = process.env.PORT || 3000;

app.use('/', express.static(__dirname + '/public'));

app.set('view engine', 'ejs')

mangoose.connect(url);
setupController(app);
apiController(app);

app.listen(port);