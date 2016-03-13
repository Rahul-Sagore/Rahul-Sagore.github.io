// APP START'angular.embed.timepicker'
// -----------------------------------
angular.module('RahulApp', ['ngRoute', 'ui.router', "oc.lazyLoad",])
    .run(["$rootScope", "$state", "$stateParams", '$window', '$templateCache',
        function ($rootScope, $state, $stateParams, $window, $templateCache) {
            // Set reference to access them from any scope
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

    }]);

// PERORMING ACTION ON VIEW Change
angular.module('RahulApp').run(function($rootScope, $location, $timeout, $state) {
    //Run After view has been loaded 
    $rootScope.$on('$viewContentLoaded', function() {
        componentHandler.upgradeAllRegistered();
        $timeout(function() {
            componentHandler.upgradeAllRegistered();
            componentHandler.upgradeDom();
        }, 1000); 
    });

    $rootScope.updgradeMDL = function(){
        $timeout(function() {
            componentHandler.upgradeAllRegistered();
        }, 1000);
    }

    //Run After ng-include has been loaded
    $rootScope.$on("$includeContentLoaded", function(event, templateName){
        componentHandler.upgradeAllRegistered();
    });

    $rootScope.$on("$locationChangeStart", function(e, currentLocation, previousLocation){
        window.currentLocation = currentLocation;
        window.previousLocation = previousLocation;
        $rootScope.is_direct_url = (currentLocation == previousLocation);

        if(!$rootScope.is_direct_url) {
            // console.log("Hola!");
        }

        // Splitting url
        var url_part = currentLocation.split("/#/");
    });

    $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
        //save the previous state in a rootScope variable so that it's accessible from everywhere
        $rootScope.previousState = from;
        $rootScope.currentPage = to.name;
    });

    $rootScope.showAjaxLoader = function(overlay){
        if(!overlay){
            $(".loader .show-overlay").toggleClass("overlay");
        }
        $(".loader .mdl-spinner").toggleClass("is-active");
    }

    $rootScope.hideAjaxLoader = function(){
        $(".show-overlay").removeClass("overlay");
        $(".mdl-spinner").removeClass("is-active");
    }
});

// LAZY LOAD CONFIGURATION
angular.module('RahulApp').config(['$ocLazyLoadProvider', 'APP_REQUIRES', function ($ocLazyLoadProvider, APP_REQUIRES) {
    'use strict';
    // Lazy Load modules configuration
    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: APP_REQUIRES.modules,
    });

}]);

// SCRIPT NAME CONFIG For OCLAZYLOAD
angular.module('RahulApp').constant('APP_REQUIRES', {
    // jQuery based/Cusomt/standalone scripts
    scripts: {
        // 'homeController': ['app/components/home/homeController.js'],
        'workController': ['app/components/work/workController.js'],
    },
    // Angular based script (use the right module name)
    modules: [
        // {name: 'bootstrap.js',          files: ['https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js',]},
        // {name: 'ui.select',                 files: ['vendor/angular-ui-select/dist/select.js',
        //                                             'vendor/angular-ui-select/dist/select.css']}, 
    ]
});

/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/
angular.module('RahulApp').provider('RouteHelpers', ['APP_REQUIRES', function (appRequires) {
    "use strict";
    // Generates a resolve object by passing script names
    // previously configured in constant.APP_REQUIRES
    this.resolveFor = function () {
        var _args = arguments;
        return {
            deps: ['$ocLazyLoad', '$q', function ($ocLL, $q) {
                // Creates a promise chain for each argument
                var promise = $q.when(1); // empty promise
                for (var i = 0, len = _args.length; i < len; i++) {
                    promise = andThen(_args[i]);
                }
                return promise;

                // creates promise to chain dynamically
                function andThen(_arg) {
                    // also support a function that returns a promise
                    if (typeof _arg == 'function')
                        return promise.then(_arg);
                    else
                        return promise.then(function () {
                            // if is a module, pass the name. If not, pass the array
                            var whatToLoad = getRequired(_arg);
                            // simple error check
                            if (!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                            // finally, return a promise
                            return $ocLL.load(whatToLoad);
                        });
                }

                // check and returns required data
                // analyze module items with the form [name: '', files: []]
                // and also simple array of script files (for not Flyrobe_Dashboard js)
                function getRequired(name) {
                    if (appRequires.modules)
                        for (var m in appRequires.modules)
                            if (appRequires.modules[m].name && appRequires.modules[m].name === name)
                                return appRequires.modules[m];
                    return appRequires.scripts && appRequires.scripts[name];
                }

            }]
        };
    }; // resolveFor

    // not necessary, only used in config block for routes
    this.$get = function () {
    };

}]);

// MAIN CONTROLLER
(function(){
        // Header Directive
    function headerDirective(){
         return {
             restrict: "E",
             templateUrl: "app/shared/header/header.html",
             controller: MainController,
             controllerAs: 'main',
         };
     }
     angular.module("RahulApp").directive("mainHeader", headerDirective);


    // MAIN CONTROLLER
    function MainController($scope, $rootScope, $window, $compile, $timeout, $state){
        //ViewModal binding using this, instead of $scope
        //Must be use with ControllerAs syntax in view
        mainVm = this;

    }

    var MainDependency = [
        "$scope",
        "$rootScope",
        "$window",
        "$compile",
        "$timeout",
        "$state",
        MainController,
    ];
    angular.module('RahulApp').controller("MainController", MainDependency);

})();
