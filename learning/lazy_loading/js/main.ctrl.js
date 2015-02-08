//Retrive the app module, use the controller function to instantiate new controller
/*angular.module('lazyloader').controller("MainController", function($scope,$http){
   $http.defaults.useXDomain = true;
   var url="https://api.instagram.com/v1/media/popular?client_id=9d918a36b4ea4648880a738450a4f5c4";
   $http.get(url).success( function(response) {
       $scope.instagram = response; 
    }).error(function(e){
        console.log(e);
    });
   console.log($scope.instagram);
   $scope.p = "Hello";
})
*/