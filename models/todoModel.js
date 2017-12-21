var mangoose = require('mongoose');
var Schema = mangoose.Schema;

var todoSchema  = new Schema({
	username:String,
	todo: String,
	isDone: {
        type: Boolean,
        default: false
    },
	dueDate: String,
	completedOn:String,
})

var Todos = mangoose.model('Todos', todoSchema);

module.exports = Todos;

