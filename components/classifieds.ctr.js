(function(){

angular
.module("ngClassifieds")
.controller("classifiedsCtrl", function($scope, $http, classifiedsFactory){
    classifiedsFactory.getClassifieds().then(function(classifieds) {
        $scope.classifieds = classifieds.data;
    });// factoryname.function.work
    
});
})();