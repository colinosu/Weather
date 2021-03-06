var app = angular.module('myApp', []);

app.controller('MainController',['$scope','$http',function($scope,$http) {
  $scope.title = "WEATHER";
  $scope.city = '';
  $scope.clock = '';
  $scope.today = true;


  // Search the city inputed
  $scope.search = function(city) {
    var city = $scope.city;
    $http({
      method : "GET",
      url : "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast " +
            "where woeid in (select woeid from geo.places(1) where text='" + city + "')&format=json&d=6"
    }).then(function mySucces(response) {
        $scope.weather = response.data;
    }, function myError(response) {
        $scope.weather = response.statusText;
    });
  }

    // Get the date, Time.
   $scope.getTimeString = function(clock) {
      var d = new Date (new Date().toDateString() + ' ' + clock);
      var str = '';
      var hrs = d.getHours();

      var meridian = hrs < 12 ? ' am' : ' pm';  // Setting the am : pm
      hrs = hrs % 12;
      if (hrs == 0) { hrs = 12; }               //if hrs is 0 paste the am to hrs
      str += hrs;

      str += ':';
      var mins = d.getMinutes();                //Get the current minute
      str += (mins < 10 ? '0' : '') + mins;     //Minute is less than 10 paste "0" to min

      str += meridian; 
      return str;
    };

    // Formatting to the Data type
    $scope.formatDate = function(date) {
      var str = date.split(" ");
      
      return str[0] + " " + str[1];
    };
    
    // Formatting to the Time type by getTimeString
    $scope.formatTime = function(timeStr) {
      return $scope.getTimeString(timeStr);
    }

    // clear city and all the weather results
    $scope.clear = function() {
      $scope.city    = "";
      $scope.weather = "";
    }

    // toggle display
    $scope.toggle = function() {
      $scope.today = !$scope.today;
    }
}]);
