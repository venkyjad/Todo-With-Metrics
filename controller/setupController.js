var Todos = require('../models/todoModel');
var Notes = require('../models/noteModel');
module.exports = function(app) {
    
   app.get('/api/setupTodos', function(req, res) {
       
       // seed database
       var starterTodos = [
			{
				
				todo:'APi Not working',
				dueDate:'11-12-17',
				completedOn:'',
				isDone:false,
				username:'raj'
			},
			{
				
				todo:'APi Not working nigguh',
				dueDate:'',
				completedOn:'11-12-17',
				isDone:true,
				username:'Sheesha'
			},
			{
				
				todo:'APi Not working jack Ass',
				dueDate:'',
				completedOn:'11-12-17',
				isDone:true,
				username:'Mahal'
			},
			{
				
				todo:'APi Not working',
				dueDate:'11-12-17',
				completedOn:'',
				isDone:false,
				username:'John'
			}
			
		];
       Todos.create(starterTodos, function(err, results) {
           res.send(results);
       }); 
   });

   app.get('/api/setupNotes',function(req, res){
   	 var starterNotes = [
			{
				id:'4851',
				notes:[
				{
					note:'Do It Fast Nigga',
					createdOn:'11-12-17'	
				},
				{
					note:'Do It Fast Nigga Ass',
					createdOn:'11-12-17'	
				},
				{
					note:'Do It Fast Nigga Wooper',
					createdOn:'11-12-17'	
				}

				]
				
				
			},
			{
				id:'6937',
				notes:[
				{
					note:'Dio',
					createdOn:'11-12-17'	
				},
				{
					note:'Get Out',
					createdOn:'11-12-17'	
				},
				{
					note:'Wolala',
					createdOn:'11-12-17'	
				}

				]
				
				
			}
			
		];
		Notes.create(starterNotes, function(err, results) {
           res.send(results);
       }); 


   });
    
}