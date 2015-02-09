/*Defining angularJS module/app */
  angular.module("lazyApp", [])
    .factory('instagram', ['$http',
        function($http) {

        	/*Function for making call to Instagram API for images*/
            return {
                fetchTag: function(tag, callback) {
                	/*API with client ID of Rahul Sagore*/
                    if(typeof tag != "undefined"){
	                    var url = "https://api.instagram.com/v1/tags/"+tag+"/media/recent?callback=JSON_CALLBACK&count=20?client_id=9d918a36b4ea4648880a738450a4f5c4&access_token=1696587752.9d918a3.eaf6363308074b069c37b52b6e085201";
	                    /* Making calls using $http object*/
	                    $http.jsonp(url).success(function(response) {
	                    	console.log(response);
	                        callback(response.data);
	                    });
	                }
                }
            }
        }
    ])
    .controller("lazyController", function($scope, $interval, instagram) {
      $scope.pics = [];
      $scope.have = [];
      $scope.search = function(tag){
      	/*Funcion for removing previous search and searching new*/
        if(typeof tag !== "undefined"){
          $scope.dataLoading = true;
          $scope.pics = [];
          $scope.have = [];
          $scope.getMore(tag);
        }
        else{
          alert("Enter a search tag");
        }
      }
      $scope.getMore = function(tag) {
        instagram.fetchTag(tag, function(data) {
            for(var i=0; i<data.length; i++) {
              if (typeof $scope.have[data[i].id]==="undefined") {
                $scope.pics.push(data[i]) ;
                $scope.have[data[i].id] = "1";
              }
            }
        });
      };
      $scope.getMore();

    });