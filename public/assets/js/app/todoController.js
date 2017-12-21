app.controller('todoListController', function($scope, $http) {
  
   
  $scope.master = {};

  $scope.getTodoLists = function(){
    
    $scope.loader_flag = true;
    $scope.master = {};
    url = 'api/todos'
    $http({
      method: "GET",
      url: url,
      dataType: 'json',
      headers: { "Content-Type": "application/json; charset=utf-8" },

      }).then(function (res) {
        $scope.todolists = res.data;
        $scope.todoList = angular.copy($scope.master);
        $scope.loader_flag = false;
       
 
        
    });

  
  }

  $scope.reset = function(){
    $scope.todoList = angular.copy($scope.master);
  }

  $scope.addTodo = function(user){
    $scope.loader = true;
    // $scope.contentFlag = true;
    $scope.todoData = angular.copy(user);
    url = 'api/todo'
    $http({
      method:'POST',
      url: url,
      data:$scope.todoData,
      dataType:'json',
      headers: { "Content-Type": "application/json; charset=utf-8" }

    }).then(function(res){
      
      if (res.data == 'Success'){
        $scope.loader = false;
        $scope.getTodoLists();
      };

    })

  }

  $scope.delete = function(id){
    url = 'api/todo'
    $http({
      method:'delete',
      url: url,
      data:{'id':id},
      dataType:'json',
      headers: { "Content-Type": "application/json; charset=utf-8" }

    }).then(function(res){
      
      if (res.data == 'success'){
        $scope.getTodoLists();
      };

    })

  }


  $scope.addNote = function(note){
    $scope.loader2 = true;
    url = 'api/notes'
    $http({
      method:'post',
      url: url,
      data:note,
      dataType:'json',
      headers: { "Content-Type": "application/json; charset=utf-8" }

    }).then(function(res){
      
      if (res.data == 'success'){
        $scope.scrapad = angular.copy($scope.master);
        $scope.loader2 = false;
      };

    })


  }
  $scope.complete = function(id){

    url = 'api/todo'
    $http({
      method:'post',
      url: url,
      data:{id:id},
      dataType:'json',
      headers: { "Content-Type": "application/json; charset=utf-8" }

    }).then(function(res){
      
      if (res.data == 'Success'){
      
        $scope.getTodoLists();
      };

    })

  }
  $scope.getTodoLists();


});