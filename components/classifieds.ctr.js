(function () {

    angular
        .module("ngClassifieds")
        .controller("classifiedsCtrl", function ($scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {
            classifiedsFactory.getClassifieds().then(function (classifieds) {
                $scope.classifieds = classifieds.data;//  $scope.classifieds is an array
                $scope.categories = getCategories($scope.classifieds);
            });// factoryname.function.work

            var contact = {
                name: "Simmy Bajaj",
                phone: "(995) 343 8126",
                email: "simmy@gmail.com"
            }

            //$scope.categories = getCategories($scope.classifieds);

            $scope.openSidebar = function () {
                $mdSidenav('left').open();
                //open function
            }
            $scope.closeSidebar = function () {
                $mdSidenav('left').close();
                //close function
            }
            $scope.saveClassified = function (classified) {
                if (classified) {
                classified.contact = contact;
                    $scope.classifieds.push(classified);
                    $scope.classified = {};// empty object feild
                    $scope.closeSidebar();// close navbar
                    showToast("Classified saved");
                }
            }

            $scope.editClassified = function (classified) {
                $scope.editing = true;
                $scope.openSidebar();
                $scope.classified = classified;

            }

            $scope.saveEdit = function (classified) {
                $scope.editing = false;
                $scope.classified = {};
                $scope.closeSidebar();
                showToast("Edited successfully");
            }

            // we will do splice to delete from frontend ie screen
            $scope.deleteClassified = function (event, classified) {
                var confirm = $mdDialog.confirm()
                    .title('Are you sure you want to delete' + classified.title + '?')
                    .ok('yes')
                    .cancel('no')
                    .targetEvent('event');
                $mdDialog.show(confirm).then(function () {// promise is there by using then
                    var index = $scope.classifieds.indexOf(classified);
                    $scope.classifieds.splice(index, 1)
                }, function () {

                })

            }

            function showToast(message) {
                $mdToast.show(
                    $mdToast.simple()
                        .content(message)
                        .position('top , right')
                        .hideDelay(3000)
                )
            }
            // use of lowdash to sort array
            function getCategories(classifieds) {

                var categories = [];

                angular.forEach(classifieds, function (item) {
                    angular.forEach(item.categories, function (category) {
                        categories.push(category);
                    });
                });

                return _.uniq(categories);
            }
        });
})();