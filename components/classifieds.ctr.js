(function(){

angular
.module("ngClassifieds")
.controller("classifiedsCtrl", function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast){
    classifiedsFactory.getClassifieds().then(function(classifieds) {
        $scope.classifieds = classifieds.data;//  $scope.classifieds is an array
    });// factoryname.function.work

    var contact={
        name: "Simmy Bajaj",
        phone: "(995) 343 8126",
        email: "simmy@gmail.com"
    }
    $scope.openSidebar= function() {
    $mdSidenav('left').open();
    //open function
    }
    $scope.closeSidebar= function() {
    $mdSidenav('left').close();
    //close function
    }
    $scope.saveClassified = function(classified) {
       if(classified)
        { classified.contact= contact;
            $scope.classifieds.push(classified);
            $scope.classified={};// empty object feild
            $scope.closeSidebar();// close navbar
            $mdTosst.show(
            $mdToast.simple()
            .content("Classified Saved")
            .position('top , right')
            .hideDelay(3000)
            )
        }
    }
    $scope.editClassified = function(classified) {
        $scope.editing = true;
        $scope.openSidebar();
        $scope.classified = classified;
    }
});
})();