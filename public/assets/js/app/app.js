var app = angular.module ("myApp", ['ngRoute','chart.js']);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "todoLists.html",
        controller : 'todoListController'
    })
    .when("/metrics", {
        templateUrl : 'metrics.html',
        controller : 'metricsController'
    })
    .when("/details/:ID", {
        templateUrl : "srapad.html",
        controller : 'notesController'
    });

    
  
   
});








app.directive('datepicker', function() {
    return {

      restrict: 'A',
      // Always use along with an ng-model
      require: '?ngModel',
      
      link: function(scope, element, attrs, ngModel) {
        if (!ngModel) return;
        
        ngModel.$render = function() {
          element.datepicker('update', ngModel.$viewValue || '');
        };
        
        element.datepicker().on("changeDate",function(event){
            scope.$apply(function() {
               ngModel.$setViewValue(event.date);
            });
        });
      }
    };
});