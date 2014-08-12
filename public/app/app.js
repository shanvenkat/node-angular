/* Register angular module with custom name myapp, all other Angular objects will add it to this custom angular module, 
Here Other Anulag objects used are Controller, Service, RouteProvider etc. 
This controller takes care of JobListing and User CRUD Operations*/

var myapp = angular.module('myapp', ['ngRoute'])

myapp.config(function ($routeProvider) {
    $routeProvider.
                when('/', {
                    templateUrl: '/app/views/userlists.html',
                    controller: 'usersController'
                }).  

                when('/update/:id', {
                    templateUrl: '/app/views/update.html',
                    controller: 'updateController'
                }).  
                				 
                when('/create/', {
                    templateUrl: '/app/views/create.html',
                    controller: 'usersController'
                }).  

                when('/addjobposting/', {
                    templateUrl: '/app/views/addjobposting.html',
                    controller: 'jobPostingController'
                }).  
                
                when('/listjobposting/', {
                    templateUrl: '/app/views/jobpostinglisting.html',
                    controller: 'jobPostingController'
                }).

                when('/jobpostingupdate/:jobid', {
                    templateUrl: '/app/views/jobpostingupdate.html',
                    controller: 'jobUpdateController'
                }).      

                otherwise({
                    redirectTo: '/'

                });
});


           