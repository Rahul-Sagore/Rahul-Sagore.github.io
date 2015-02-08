//Retrive the app module, use the controller function to instantiate new controller
angular.module('lazyloader').controller("MainController", function($scope,$http){
   var url="https://api.instagram.com/v1/media/popular?access_token=1696587752.9d918a3.eaf6363308074b069c37b52b6e085201";
   $http.get(url).success( function(response) {
       $scope.instagram = response; 
       console.log(response);
    });
   console.log($scope.instagram);
   $scope.p = "Hello";
})