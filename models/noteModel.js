var mangoose = require('mongoose');
var Schema = mangoose.Schema;

var NotesSchema  = new Schema({
	id:String,
	notes: [{
		note: String,
		createdOn: String,
	}]
})

var Notes = mangoose.model('Notes', NotesSchema);

module.exports = Notes;