//Instantiate an Angular JS module, module() acts as a setter & getter
//app - module name, 2nd arg used to create app module as opposed to retrieving it
angular.module('lazyloader', []).config(['$httpProvider', function($httpProvider) {
     $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

 }]);

angular.module('lazyloader').controller("MainController", function($scope,$http){
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
