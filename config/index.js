var configFiles = require('./config');

module.exports = {
	getDbConnectionString : function(){
		return 	'mongodb://' + configFiles.uname +':' + configFiles.pwd +'@ds143559.mlab.com:43559/todolistvj'
	}
}	