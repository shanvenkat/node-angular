myapp.controller ('usersController', function ($scope, $http,$location) {
        
    init();
    function init() {
        //testthis ();
        $scope.recordsPerPage = 2;
        getCount();
        //getUsers();             
        homePage(1);        
    }    

    function testthis() {
        $http.post('/addtaxterm/'+ 'W2' +'/' )
            .success(function (data) {                                 
                //$location.path('/');  
            })
            .error(function (data) {
                console.log('Error: ' + data);                
            });


    }
    function checkforDecimal(m){
            var n = parseInt(m);
            if (m/n == 1)
                {return false; }   
            else { return true;}
    }

    function replaceToDash(str){
        var finalstr = '';
        for (i=0;i<str.length;i++){
            if (str[i] == '/'){
                    finalstr = finalstr + '-';
                }
            else{
                finalstr = finalstr + str[i]
            }          
        }   
        return finalstr; 
    }

    function getCount(){            
            $http.get('/count')
                .success(function (data) {
                    $scope.reccount = data;                     
                    var pagesBrowse = $scope.reccount / $scope.recordsPerPage;  
                    if (checkforDecimal (pagesBrowse)){
                            $scope.totalPagestoBrowse = parseInt(pagesBrowse)  + 1;
                            $scope.buttonstoDisplay = parseInt(pagesBrowse) + 1;                               
                        }    
                    else
                            {                             
                            $scope.totalPagestoBrowse = pagesBrowse ;
                            $scope.buttonstoDisplay = pagesBrowse;    
                            }                                        
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });        
    };

    $scope.clickCancel = function () {                       
        $location.path('/');                
    };  

    $scope.adduser = function () {        
        var firstname = $scope.user.firstname;
        var lastname = $scope.user.lastname;
        var gender = $scope.user.gender;
        var age = $scope.user.age;
        var dob = replaceToDash($scope.user.dob);
        var emptype = $scope.user.emptype;  
        var email = $scope.user.email;
        //alert ('dob# ' + dob)
        $http.post('/adduser/'+ firstname +'/' + lastname + '/' + gender + '/' + age +'/' + dob +'/' + emptype + '/' + email +'/')
            .success(function (data) {                 
                //$scope.userlists = data;
                $location.path('/');  
            })
            .error(function (data) {
                console.log('Error: ' + data);                
            });

            $scope.user.firstname='';
            $scope.user.lastname='';
            $scope.user.gender='';
            $scope.user.age='';
            $scope.user.dob='';  
            $scope.user.emptype='';  
            $scope.user.email='';        
    };



    $scope.deleteuser = function (id) {               
            $http.delete('/delete/'+ id + '/')
            .success(function (data) {                 
                //$scope.userlists = data;                
                //$location.path('/');
                homePage(1);
            })
            .error(function (data) {
                console.log('Error: ' + data);                
            });                    
    };    
    
    function getUsers(){        
        $http.get('/userlist')
                .success(function (data) {                                  
                    $scope.userlists = data;                                  
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });        
    };

function homePage(page){    
    $scope.currentPage = page;
    browsebyButton (page);               
}

$scope.firstPage = function (page) {      
        $scope.currentPage = page;
        browsebyButton (page);  
    };

$scope.prevPage = function () {
       if ($scope.currentPage > 1){
            $scope.currentPage = $scope.currentPage -1 ;
            browsebyButton ($scope.currentPage);               
        };
    };

$scope.nextPage = function () {   
        if ($scope.currentPage < $scope.totalPagestoBrowse){         
            $scope.currentPage = $scope.currentPage + 1 ;       
            browsebyButton ($scope.currentPage);               
        };
    };

$scope.lastPage = function (page) {
    $scope.currentPage = page;
        browsebyButton (page);               
    };

$scope.pageChanged = function (page) {
        $scope.currentPage = page;
       browsebyButton (page);               
    };

function browsebyButton(page) {
    var startRecord =page * $scope.recordsPerPage - $scope.recordsPerPage;
    var endRecord  = startRecord + $scope.recordsPerPage;

    // for loop to loop around start record to end record
    $http.get('/userlist/' + startRecord + '/' + endRecord + '/' )
        .success(function (data) {                                                      
            $scope.pageLists = data;                             
        })
       .error(function (data) {
         console.log('Error: ' + data);
        });
}

    $scope.range = function (start, end) {
        var ret = [];
        if (!end) {
            end = start;
            start = 1;
        }
        for (var i = start; i <= end; i++) {
            ret.push(i);
        }
        return ret;
    }; 
    
});


myapp.controller ('updateController', function ($scope, $http, $routeParams, $location, $filter) {

    var id = $routeParams.id;
    init();
    function init() {        
        doupdate();        
    }   

    function doupdate(){
        $http.get('/search/' + $routeParams.id)
                .success(function (data) {
                    //data[0].DOB = $filter('date')(data[0].DOB, 'MM-dd-yyyy')
                    $scope.recordtoUpdate = data[0];                     
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });            
    };    

        function replaceToDash(str){
        var finalstr = '';
        for (i=0;i<str.length;i++){
            if (str[i] == '/'){
                    finalstr = finalstr + '-';
                }
            else{
                finalstr = finalstr + str[i]
            }          
        }   
        return finalstr; 
    }

    $scope.updateuser = function (docid, strfirstname,  strlastname,  strgender, strage, strdob, stremptype,  stremail) {
        strdob = replaceToDash(strdob);
        $http.put('/update/'+ docid + '/' + strfirstname +'/' + strlastname +'/' +strgender+ '/' + strage + '/' + strdob + '/' + stremptype + '/' + stremail + '/')
        $location.path('/');                           
    };

    $scope.clickCancel = function () {                       
        $location.path('/');                
    };  

    $scope.clickDelete = function () {               
        $http.delete('/delete/'+ id + '/')
        $location.path('/');                                        
    };

});


myapp.controller ('jobPostingController', function ($scope, $http,$location) {
        
    init();
    function init() {
        $scope.recordsPerPage = 2;
        getPostingCount();
        getTravelRequiredData();
        getTaxTermData();
        //getUsers();             
        homePage(1);
    }    
 
    function getTravelRequiredData(){
        $http.get('/travelrequiredlists')
                .success(function (data) { 
                    $scope.travelrequiredlists = data;                                                      
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    }

    function getTaxTermData(){
        $http.get('/taxtermlists')
                .success(function (data) { 
                    $scope.taxtermlists = data;                                  
                    console.log("$scope.taxtermlists " + $scope.taxtermlists);                                 
                    
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    }

    function checkforDecimal(m){
            var n = parseInt(m);
            if (m/n == 1)
                {return false; }   
            else { return true;}
    }

    function replaceToDash(str){
        var finalstr = '';
        if (str != ''){
            for (i=0;i<str.length;i++){
                if (str[i] == '/'){
                    finalstr = finalstr + '-';
                }
                else{
                    finalstr = finalstr + str[i]
                }          
            }   
        }
        return finalstr; 
    }

    function getPostingCount(){            
            $http.get('/jobpostingcount')
                .success(function (data) {
                    $scope.reccount = data;                     
                    var pagesBrowse = $scope.reccount / $scope.recordsPerPage;  
                    if (checkforDecimal (pagesBrowse)){
                            $scope.totalPagestoBrowse = parseInt(pagesBrowse)  + 1;
                            $scope.buttonstoDisplay = parseInt(pagesBrowse) + 1;                               
                        }    
                    else
                            {                             
                            $scope.totalPagestoBrowse = pagesBrowse ;
                            $scope.buttonstoDisplay = pagesBrowse;    
                            }                                        
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });        
    };

    $scope.clickCancel = function () {                       
        $location.path('/');                
    };  

    $scope.addjobposting = function () {        
        var requiredskills = $scope.job.requiredskills;
        var joblocation = $scope.job.joblocation;
        var areacode = $scope.job.areacode;
        var travelrequired = $scope.job.travelrequired;
        var telecommute = $scope.job.telecommute;
        var payrate = $scope.job.payrate;
        var taxterm = $scope.job.taxterm;
        var length = $scope.job.uilength;
        var posteddate = replaceToDash($scope.job.posteddate);        
        var positionid = $scope.job.positionid; 
        var aboutcompany = $scope.job.aboutcompany; 
        var positionsummary = $scope.job.positionsummary; 
        var minimumqualifications = $scope.job.minimumqualifications;
        var contactaddress = $scope.job.contactaddress; 

        $http.post('/addjobposting/'+ requiredskills +'/' + joblocation + '/' + areacode + '/' + travelrequired +'/' + telecommute +'/' + 
            payrate + '/' + taxterm +'/' + length +'/' + posteddate +'/' + positionid +'/' + aboutcompany +'/' + positionsummary +'/'
            + minimumqualifications +'/' + contactaddress +'/' )
            .success(function (data) {                 
                //$scope.userlists = data;
                $location.path('/listjobposting');  
            })
            .error(function (data) {
                console.log('Error: ' + data);                
            });
            //$scope.user.email='';        
    };

    $scope.deleteuser = function (id) {               
            $http.delete('/jobiddelete/'+ id + '/')
            .success(function (data) {                 
                //$scope.userlists = data;                
                //$location.path('/');
                //homePage(1);
                $location.path('/');
            })
            .error(function (data) {
                console.log('Error: ' + data);                
            });                    
    };    
    
    function getUsers(){        
        $http.get('/jobpostinglists')
                .success(function (data) {                                  
                    $scope.jobpostinglists = data;                                  
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });        
    };

function homePage(page){    
    $scope.currentPage = page;
    browsebyButton (page);               
}

$scope.firstPage = function (page) {      
        $scope.currentPage = page;
        browsebyButton (page);  
    };

$scope.prevPage = function () {
       if ($scope.currentPage > 1){
            $scope.currentPage = $scope.currentPage -1 ;
            browsebyButton ($scope.currentPage);               
        };
    };

$scope.nextPage = function () {   
        if ($scope.currentPage < $scope.totalPagestoBrowse){         
            $scope.currentPage = $scope.currentPage + 1 ;       
            browsebyButton ($scope.currentPage);               
        };
    };

$scope.lastPage = function (page) {
    $scope.currentPage = page;
        browsebyButton (page);               
    };

$scope.pageChanged = function (page) {
        $scope.currentPage = page;
       browsebyButton (page);               
    };

function browsebyButton(page) {
    var startRecord =page * $scope.recordsPerPage - $scope.recordsPerPage;
    var endRecord  = startRecord + $scope.recordsPerPage;

    // for loop to loop around start record to end record
    $http.get('/jobpostingbrowse/' + startRecord + '/' + endRecord + '/' )
        .success(function (data) {                                                      
            $scope.jobpostinglists = data;                             
        })
       .error(function (data) {
         console.log('Error: ' + data);
        });
}

    $scope.range = function (start, end) {
        var ret = [];
        if (!end) {
            end = start;
            start = 1;
        }
        for (var i = start; i <= end; i++) {
            ret.push(i);
        }
        return ret;
    }; 
    
});

myapp.controller ('jobUpdateController', function ($scope, $http, $routeParams, $location) {    
    init();
    function init() {                
        getTravelRequiredData();
        getTaxTermData();
        getjobUpdateInfo();
    }

    function getTravelRequiredData(){
        $http.get('/travelrequiredlists')
                .success(function (data) { 
                    $scope.travelrequiredlists = data;                                                      
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    }

     function getTaxTermData(){
        $http.get('/taxtermlists')
                .success(function (data) { 
                    $scope.taxtermlists = data;             
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    }
  

    function getjobUpdateInfo(){
        $http.get('/jobIdSearch/' + $routeParams.jobid)
                .success(function (data) {
                    $scope.jobIDToUpdate = data[0];                     
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });            
    };

    function replaceToDash(str){
        var finalstr = '';
        for (i=0;i<str.length;i++){
            if (str[i] == '/'){
                    finalstr = finalstr + '-';
                }
            else{
                finalstr = finalstr + str[i]
            }          
        }   
        return finalstr; 
    }

    $scope.updateJobId = function (jobid, requiredskills, joblocation,areacode,travelrequired,
        telecommute,payrate,taxterm,uilength,
        posteddate,positionid,aboutcompany,positionsummary,minimumqualifications,contactaddress) {        
        strdob = replaceToDash(posteddate);                
        $http.put('/JobIDUpdate/'+ jobid + '/' + requiredskills + '/' + joblocation +'/' + areacode +'/' +travelrequired+ '/' + telecommute + '/' + payrate + '/' + 
            taxterm + '/' + uilength + '/' + strdob + '/' + positionid + '/' + aboutcompany + '/'+ positionsummary + '/'+ minimumqualifications + '/'+ 
            contactaddress + '/')
            $location.path('/listjobposting');                           
        
    };

    $scope.clickCancel = function () {
        $location.path('/listjobposting/');                
    };  

    $scope.clickDelete = function () {               
        $http.delete('/jobiddelete/'+ + $routeParams.jobid + '/')
        $location.path('/listjobposting/');                                        
    };

});
