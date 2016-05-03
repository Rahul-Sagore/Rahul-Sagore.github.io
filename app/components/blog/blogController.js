(function(){

	function blogController($scope, $http, $rootScope, $timeout, $state) {
		blogVm = this;

		// Variable Declaration
		

		// Function Declaration
	 	blogVm.initDisqus = initDisqus;
		
		if($state.current.name == "blogpost")	{
			article_url = $state.params.blog_url;
			$rootScope.SEO.title = article_url.split("-").join(" ");
		}

		blogVm.blogMeta = [
			{
				title: "Vertical tabs with Material Design Lite",
				image: "http://digitalexpressmag.com/wp-content/uploads/2015/07/Google-Material-Design-For-Websites.jpg",
				url: "vertical-tabs-with-material-design-lite",
			},
		];

		$rootScope.updgradeMDL();

		// var disqus_config = function () {
		// 	this.page.url = "http://localhost:8002/#/blog/vertical-tabs-with-material-design-lite"; // Replace PAGE_URL with your page's canonical URL variable
		// 	this.page.identifier = "vertical-tabs-with-mdl"; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
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
	                this.page.identifier = post_url.url;  
	                this.page.url = "http://rahul-sagore.github.io/#/blog/"+ post_url.url;
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