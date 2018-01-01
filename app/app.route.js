// To run this code, edit file
// index.html or index.jade and change
// html data-ng-app attribute from
// angle to myAppName
// -----------------------------------

// Setting Module
(function(){
    angular.module('RahulRoutes', ['RahulApp',]);

    // Template, dirctives, js/css urls

    var  homeTemplate = 'app/components/home/home.html';
    var  workTemplate = 'app/components/work/work.html';
    var  contactTemplate = 'app/components/contact/contact.html';
    var  blogTemplate = 'app/components/blog/index.html';

    // CSS for View/Directives
    var highlightCSS = "assets/css/monokai-sublime.css";

    function MainRoutes($stateProvider, $locationProvider, $urlRouterProvider, helper) {
        'use strict';

        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);
        // $locationProvider.hashPrefix('!');

        // default route
        $urlRouterProvider.otherwise('/');

        // --------------Application Routes---------------
        $stateProvider
            .state('root', {
                url: '/',
                templateUrl: homeTemplate,
                // resolve: helper.resolveFor('homeController'),
            })
            .state('work', {
                url: '/work',
                templateUrl: workTemplate,
                resolve: helper.resolveFor('workController'),
            })
            .state('contact', {
                url: '/contact',
                templateUrl: contactTemplate,
                // resolve: helper.resolveFor('workController'),
            })
            .state('blog', {
                url: '/blog',
                templateUrl: blogTemplate,
                css: highlightCSS,
                resolve: helper.resolveFor('blogController', 'highlight'),
            })
            .state('blogpost', {
                url: '/:blog_url',
                parent: 'blog',
                templateProvider: function ($stateParams, $http, $state) {
                    return $http.get('./app/components/blog/blogposts/' + $stateParams.blog_url + '.html')
                      .then(function (data) {
                        return data.data;
                      }, function(){
                        // $state.t
                      });
                },
                resolve: helper.resolveFor('blogController'),
            })
    }

    // Dependency and rout function array
    var RahulRoutes = [
        '$stateProvider', 
        '$locationProvider', 
        '$urlRouterProvider',
        'RouteHelpersProvider',
        MainRoutes,
    ]

    // Getting module and setting routes
    angular.module('RahulRoutes').config(RahulRoutes);
})();
