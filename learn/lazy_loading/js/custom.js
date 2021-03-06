
/*Defining angularJS module/app/controller */
  angular.module("lazyApp", [])
    .factory('instagram', ['$http',
        function($http) {
        	/*Function for making call to Instagram API for images*/
            return {
                fetchTag: function(tag, next, callback) {
                	/*API with client ID of Rahul Sagore*/ 
                    if(typeof tag != "undefined" && next != "stopped"){
                      var url = "https://api.instagram.com/v1/tags/"+tag+"/media/recent?callback=JSON_CALLBACK&count=20&client_id=9d918a36b4ea4648880a738450a4f5c4&access_token=1696587752.9d918a3.eaf6363308074b069c37b52b6e085201";
                      /* Making calls using $http object*/
	                    $http.jsonp(url).success(function(response) {
                          // var next = response.pagination.next_max_id;
                          console.log(response);
	                        callback(response.data, next);
	                    });
	                }
                }
            }
        }
    ])
    .controller("lazyController", function($scope, $http, $interval, instagram) {
      $scope.pics = [];
      $scope.search = function(tag){
      	/*Funcion for removing previous search and searching new*/
        if(typeof tag !== "undefined"){
          $scope.loadMessage = "Loading...";
          $scope.pics = [];
          $scope.getSuggestions(tag);
          $scope.getMore(tag);
        }
        else{
          alert("Enter a search tag");
        }
      }
      $scope.getMore = function(tag, next) {
        instagram.fetchTag(tag, next, function(data, next) {
            $scope.next = next;
            for(var i=0; i<data.length; i++) {
                $scope.pics.push(data[i]);
            }
            if(next === undefined){
              $scope.next = "stopped";
              $scope.loadMessage = "No image found to load";
            }
        });
      };
      $scope.getSuggestions = function(tag){
        //getting similar terms from JSON wordlist
        // $scope.tag = tag; //Updating tag value based on suggestion
        // tag_sliced = tag.slice(0,3).toLowerCase(); //Slicing first three letters from tag to match
        // $scope.suggestions = [];
        // $http.get('wordlist.json')
        // .success(function (response) {
        //       wordlist = response["wordlist"];
        //       length = wordlist.length;
        //       for(i = 0; i<length; i++){
        //         if(wordlist[i].startsWith(tag_sliced) && wordlist[i] != tag.toLowerCase() ){
        //           $scope.suggestions.push(wordlist[i]);
        //         }
        //       }
        // });
      };
}).directive('whenScrolled', function() {
    //custom directive for scrolling event
    return function(scope, elm, attr) {
        var raw = elm[0];
        var funCheckBounds = function(evt) {
            var rectObject = raw.getBoundingClientRect();
            if (rectObject.bottom === window.innerHeight) {
                scope.$apply(attr.whenScrolled);
            }
        };   
        angular.element(window).bind('scroll', funCheckBounds);
    };
});