//Retrive the app module, use the controller function to instantiate new controller
angular.module('app').controller("MainController", function(){
	var vm = this;
	vm.title = "AngularJS Learning Example";
	vm.searchInput = '';
	vm.shows = [
        {
            title: 'Game of Thrones',
            year: 2011,
            favorite: true
        },
        {
            title: 'Walking Dead',
            year: 2010,
            favorite: false
        },
        {
            title: 'Firefly',
            year: 2002,
            favorite: true
        },
        {
            title: 'Banshee',
            year: 2013,
            favorite: true
        },
        {
            title: 'Greys Anatomy',
            year: 2005,
            favorite: false
        }
    ];
    //order by 
    vm.orders = [
    {
        id: 1,
        title: 'Year Ascending',
        key: 'year',
        reverse: false
    },
    {
        id: 2,
        title: 'Year Descending',
        key: 'year',
        reverse: true
    },
    {
        id: 3,
        title: 'Title Ascending',
        key: 'title',
        reverse: false
    },
    {
        id: 4,
        title: 'Title Ascending',
        key: 'title',
        reverse: true
    }
	];
	vm.order = vm.orders[0];
	//adding new data
	vm.new = {};
	vm.addShow = function(){
		vm.shows.push(vm.new);
		vm.new = {};
	}
})