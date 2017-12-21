var Todos = require('../models/todoModel');
var Notes = require('../models/noteModel');
var bodyParser = require('body-parser');

module.exports= function(app){

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended : true }));

	app.get('/api/todos', function(req , res) {
		Todos.find({}, function(err, todos){
			if (err) throw err;
			res.send(todos);

		});
	

		
	});

	app.get('/api/notes/:id',function(req, res){
		Notes.find({ id:req.params.id}, function(err, notes){
			if (err) throw err;
			res.send(notes)
		});


	});

	app.post('/api/todo', function(req, res){


		if (req.body.id){
			var todayTime = new Date();
  	  var month = todayTime.getMonth() + 1;
    	var day = todayTime.getDate();
    	var year = todayTime.getFullYear();
    	var currentDay = day + "/" + month + "/" + year;
			Todos.findByIdAndUpdate(req.body.id,{
				isDone:true,
				completedOn:currentDay
			}, function(err, todo){
				if (err) throw err;

				res.send('Success');
			});

		}
		else{
			var newTodo = Todos({
			username: req.body.username,
			todo: req.body.todo,
			dueDate: req.body.dueDate,
			completedOn:""
			});

			newTodo.save(function(err){
				res.send('Success');
			});


		}
		
	});

	app.delete('/api/todo', function(req, res){
		Todos.findByIdAndRemove(req.body.id, function(err){
			if (err) throw error;
			res.send('success');
		})

	});

	app.post('/api/notes', function(req, res){
		Notes.find({ id:req.body.id}, function(err, notes){
			if (err) throw err;
			if(!notes.length){
				var newNote = Notes({
					id:req.body.id,
					notes:{
						note:req.body.note,
						createdOn:Date()
					}
					
				});

				newNote.save(function(err){
					res.send("success");
				})
			}
			else{
				var scrapPad = {"note": req.body.note, "createdOn":Date()};
				Notes.findOneAndUpdate({id: req.body.id},{$push:{notes: scrapPad}}, function(err, notes){
					if (err) throw error;
					res.send('success');
				});
			}
				

		});





		
	});
	app.get('/api/todo/users', function(req, res){
		
		Todos.aggregate([
        {
            $group: {
                _id: '$username',  //$region is the column name in collection
                count: {$sum: 1}
            }
        }
    ], function (err, result) {
        if (err) {
            next(err);
        } else {
            res.json(result);
        }
    });
	});

	app.get('/api/todo/submissions', function(req, res){
		Todos.aggregate([
     
    {
        $group: {
            _id: '$username',
            lateSubmission: { $sum: { $cond: 
            	[ {
	            		$and : 
		            	[ 
		            		{ $lt: [ "$dueDate", "$completedOn"] },
		                { $eq: [ "$isDone",true] }
									] 
								},1, 0 
							] } },
            OnTime: { $sum: { $cond: 
            	[ {
	            		$and : 
		            	[ 
		            		{ $gte: [ "$dueDate", "$completedOn"] },
		                { $eq: [ "$isDone",true] }
									] 
								},1, 0 
							] } } 
					}
    }
    ], function (err, result) {
        if (err) {
            next(err);
        } else {
            res.json(result);
        }
    });
		
   


	});
}


