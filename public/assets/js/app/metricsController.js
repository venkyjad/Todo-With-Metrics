app.controller('metricsController', function($scope, $http){
 // Gets no. of Tasks Assigned
 $scope.getMetricsPie = function(){
  $scope.loader_flag = true;
  url = 'api/todo/users'
    $http({
      method: "GET",
      url: url,
      dataType: 'json',
      headers: { "Content-Type": "application/json; charset=utf-8" },

      }).then(function (res) {
        var tempData = res.data
        $scope.users = tempData
        var labels = [];
        var dataSet = []
        for(var i=0; i<tempData.length; i++){
            labels.push(tempData[i]._id);
            dataSet.push(tempData[i].count)
        }
        
         $scope.labels = labels;
         $scope.data = dataSet;
         $scope.options = {

            scales: {
              scaleStartValue: 0,
               xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Users -->'
                        }
                    }],
              yAxes: [
                {
                  
                  display: true,
                  position: 'left',
                  
                   ticks: {
                    beginAtZero: true,
                    stepSize:1
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Tasks -->'
                  }
                }
              ]
            }
          };
      });


 }
 // Gets Time of submission
 $scope.getMetricsBar = function(){
  url = 'api/todo/submissions'
    $http({
      method: "GET",
      url: url,
      dataType: 'json',
      headers: { "Content-Type": "application/json; charset=utf-8" },

      }).then(function (res) {
        var tempData = res.data
        $scope.users = tempData
        var labels = [];
        var dataSet1 = []
        var dataSet2 = []
        for(var i=0; i<tempData.length; i++){
            labels.push(tempData[i]._id);
            dataSet1.push(tempData[i].lateSubmission)
            dataSet2.push(tempData[i].OnTime)
        }
        
        $scope.labelsBar = labels
        $scope.seriesBar = ['Late submissions', 'On/Before Due Date'];

        $scope.dataBar = [dataSet1,dataSet2];
        $scope.optionsBar = {

            scales: {
              scaleStartValue: 0,
               xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Users -->'
                        }
                    }],
              yAxes: [
                {
                  
                  display: true,
                  position: 'left',
                  
                   ticks: {
                    beginAtZero: true,
                    stepSize:1
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Tasks -->'
                  }
                }
              ]
            }
          };
          $scope.loader_flag = false;
      });


 }
 $scope.getMetricsPie();
 $scope.getMetricsBar();
 
  

});