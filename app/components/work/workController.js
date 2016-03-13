(function(){

	function workController($scope, $rootScope) {

		workVm = this;

		workVm.goToTab = goToTab;

		function goToTab(tab_name) {
			// Removing current active tab 
			$(".mdl-tabs__tab").removeClass("is-active");			
			$(".mdl-tabs__panel").removeClass("is-active");	
					
			$("a[href=#" + tab_name + "]").addClass("is-active");
			$("#" + tab_name).addClass("is-active");
		}

	}
	var workDependency = [
	    "$scope",
	    "$rootScope",
	    workController
	];
	angular.module('RahulApp').controller('workController', workDependency);

})();