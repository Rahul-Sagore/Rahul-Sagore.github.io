(function(){

  function blogController($scope, $http, $rootScope, $timeout, $state) {
    blogVm = this;

    // Variable Declaration
    

    // Function Declaration
    blogVm.initDisqus = initDisqus;
    
    if($state.current.name == "blogpost") {
      article_url = $state.params.blog_url;
      $rootScope.SEO.title = article_url.split("-").join(" ");
    }
    blogURLPrefix = './#/blog/';

    blogVm.blogMeta = [
      {
        title: "Understanding Event Loop, Call Stack & Job Queue",
        image: "https://miro.medium.com/max/1600/1*iHhUyO4DliDwa6x_cO5E3A.gif",
        url: "https://medium.com/@Rahulx1/understanding-event-loop-call-stack-event-job-queue-in-javascript-63dcd2c71ecd",
        newTab: true,
      }, {
        title: "Develop Chrome Extension",
        image: "/assets/img/blog/chromelogo.jpg",
        url: "https://medium.com/@Rahulx1/creating-and-publishing-chrome-extension-519f73c36f6c",
      },
      {
        title: "Vertical tabs with Material Design Lite",
        image: "/assets/img/blog/material.jpg",
        url: blogURLPrefix + "vertical-tabs-with-material-design-lite",
      },
      {
        title: "ES6 Notes",
        image: "/assets/img/blog/ES6.png",
        url: blogURLPrefix + "es6-notes",
      },
    ];

    init();

    function init() {
      $rootScope.updgradeMDL();

      // INIT HIGHLIGH JS
      $scope.$on('$viewContentLoaded', function(){
        $('pre code').each(function(i, block) {
          hljs.highlightBlock(block);
        });
      });
    }



    // var disqus_config = function () {
    //  this.page.url = "http://localhost:8002/#/blog/vertical-tabs-with-material-design-lite"; // Replace PAGE_URL with your page's canonical URL variable
    //  this.page.identifier = "vertical-tabs-with-mdl"; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    // };
    (function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');

    s.src = '//bloggasm.disqus.com/embed.js';

    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
    })();

    // Initializing DISQUS everytime blog post link clicked
    function initDisqus(post) {
      $rootScope.SEO.title = post.title;
      $rootScope.SEO.description = post.title;
      setTimeout(function() {
        DISQUS.reset({
                reload: true,
                config: function () {  
                  this.page.identifier = post.url;  
                  this.page.url = "http://rahul-sagore.github.io/#/blog/"+ post.url;
                }
              });
      }, 1000);
    }

  }

  var blogDependency = [
      "$scope",
      "$http",
      "$rootScope",
      "$timeout",
      "$state",
      blogController
  ];
  angular.module('RahulApp').controller('blogController', blogDependency);
})();