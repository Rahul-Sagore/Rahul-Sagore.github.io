//Retrive the app module, use the controller function to instantiate new controller
angular.module('lazyloader').controller("MainController", function($scope,$http){
   var url="https://api.instagram.com/oauth/authorize/?client_id=9d918a36b4ea4648880a738450a4f5c4&redirect_uri=REDIRECT-URI&response_type=code";
   $http.get(url).success( function(response) {
       $scope.instagram = response; 
    });
   console.log(url);
   $scope.p = "Hello";
})