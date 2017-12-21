app.controller('notesController', function($scope, $http, $routeParams){

  $scope.getNotes = function(){
    id = $routeParams.ID;
    url = 'api/notes/'+id
    $http({
      method: "GET",
      url: url,
      dataType: 'json',
      headers: { "Content-Type": "application/json; charset=utf-8" },

      }).then(function (res) {
        $scope.notesCollection = res.data[0].notes;
        console.log(res.data[0].notes);
        
    });
  
  }
  $scope.getNotes();

});