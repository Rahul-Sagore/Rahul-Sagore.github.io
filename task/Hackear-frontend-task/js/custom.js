$(document).ready(function(){
	componentHandler.upgradeAllRegistered();
});

var myApp = angular.module('myApp',['ngSanitize', 'ui.select']);


// Controller for deals
myApp.controller('ProblemsController', ['$scope', '$http', function($scope, $http) {

	// Function for updating Total likes
	$scope.updateTotalLikes = function() {
 		for(var j = 0; j < $scope.stored_likes.length; j++) {
	 		$scope.total_like = $scope.total_like + $scope.stored_likes[j];
	 	}
 	}

 	$scope.sortBy = 'rating';

 	$scope.initLikes = function(){
 		// Get like array from LocalStorage
		var storedLike = localStorage.getItem("problem_likes");
		// Check if localStorage has value or set it to default
		$scope.total_like = 0;
	 	if(!storedLike){
	 		// Setting like values to zero
	 		$scope.stored_likes = Array.apply(null, Array($scope.problems.length)).map(function() { return 0 });
	 	} else {
	 		$scope.stored_likes = JSON.parse(storedLike);
	 		// updating total likes
	 		$scope.updateTotalLikes();
	 	}
 	}

	// Getting "API hits"
	$http.get("http://hackerearth.0x10.info/api/problems?type=json&query=api_hits")
		.success(function(response){
			console.log(response);
			$scope.api_hits = response.api_hits;
		})

 	// Http call for getting Problems data
 	$http.get("http://hackerearth.0x10.info/api/problems?type=json&query=list_problems")
 		.success(function(response){
 			$(".mdl-spinner").removeClass("is-active");

 			// Sorting Response problem based on rating.
			response.problems.sort($scope.sortAscDesc('rating', true, parseFloat));

			//Adding index as id to each problem object
			angular.forEach(response.problems, function(member, index){
			   //Just add the index to item
			   member.id = index;
			});

 			$scope.problems = response.problems;

 			// Initialize like 
 			$scope.initLikes();

 			// // Update each product likes
 			$scope.updateProductLikes();

 			// Set Tags
 			$scope.setTags();

 			console.log($scope.problems);
 		})
 		.error(function(){
 			$(".mdl-spinner").removeClass("is-active");
 		});

 	// Function for updating each product like
 	$scope.addLike = function(item_index) {
 		$scope.stored_likes[item_index] += 1;
 		$scope.total_like += 1;

 		// setting like to local storage
 		localStorage.setItem("problem_likes", JSON.stringify($scope.stored_likes));

 		$scope.updateProductLikes(item_index);
 	}

 	// Updating product likes
 	$scope.updateProductLikes = function(index) {
 		// Updating particular product's like if index is defined
 		if(!index){
		 	for(var i = 0; i < $scope.stored_likes.length; i++) {
		 		$scope.problems[i].likes = $scope.stored_likes[i];
		 	}	
 		} else {
 			$scope.problems[index].likes = $scope.stored_likes[index];
 		}
 	}

 	// Function for gettng unique tags
 	$scope.setTags = function(){
 		var problem_tags = [];
 		var counter = 0
 		// Pushing unique tags from the problem api
 		for(var i = 0; i < $scope.problems.length; i++) {
 			var tags_arr = $scope.problems[i].tags;
 			for(j = 0; j < tags_arr.length; j++){
 				if(tags_arr[j] && problem_tags.indexOf(tags_arr[j]) == -1) {
 					problem_tags.push({ tag: tags_arr[j], id: counter});
 					counter++
 				}
 			}
 		}
 		$scope.problem_tags = problem_tags;
 		console.log($scope.problem_tags);
 	}

 	//Function for sorting array of object based on key
 	$scope.sortAscDesc = function(field, reverse, primer){
	   var key = primer ? 
	       function(x) {return primer(x[field])} : 
	       function(x) {return x[field]};

	   reverse = !reverse ? 1 : -1;

	   return function (a, b) {
	       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
	    } 
 	}

 	$scope.onSelected = function($item){
 		if($item){
 			$scope.selectedTag = $item.tag;
 		} else {
 			$scope.selectedTag = "";
 		}
 	}

}]);