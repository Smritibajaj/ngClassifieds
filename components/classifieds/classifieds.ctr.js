(function () {
    "use strict";

    angular
        .module("ngClassifieds")
        .controller("classifiedsCtrl", function ($scope, $http, $state, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {

            var vm = this;

            vm.categories;
            vm.classified;
            vm.classifieds;
            vm.closeSidebar = closeSidebar;
            vm.deleteClassified = vm.deleteClassified;
            vm.editing;
            vm.editClassified = editClassified;
            vm.openSidebar = openSidebar;
            vm.saveClassified = saveClassified;
            vm.saveEdit = saveEdit;


            classifiedsFactory.getClassifieds().then(function (classifieds) {
                vm.classifieds = classifieds.data;//  vm.classifieds is an array
                vm.categories = getCategories(vm.classifieds);
            });// factoryname.function.work

            $scope.$on('newClassified', function (event, classified) {
                classifieds.id = vm.classifieds.length + 1;
                vm.classifieds.push(classified);
                showToast('classified saved')

            })
            $scope.$on('editSaved', function (event, message) {
                showToast(message);
            })

            //vm.categories = getCategories(vm.classifieds);

            function openSidebar() {
                $state.go('classifieds.new')
                //open function
            }
            function closeSidebar() {
                $mdSidenav('left').close();
                //close function
            }/// to get rid of $scope we take it as a function and described it above
            function saveClassified(classified) {
                if (classified) {
                    classified.contact = contact;
                    vm.classifieds.push(classified);
                    vm.classified = {};// empty object feild
                    closeSidebar();// close navbar
                    showToast("Classified saved");
                }
            }

            function editClassified(classified) {
                $state.go('classifieds.edit', {
                    id: classified.id,
                    classified: classified
                })
            }

            function saveEdit(classified) {
                vm.editing = false;
                vm.classified = {};
                closeSidebar();
                showToast("Edited successfully");
            }

            // we will do splice to delete from frontend ie screen
            function deleteClassified(event, classified) {
                var confirm = $mdDialog.confirm()
                    .title('Are you sure you want to delete' + classified.title + '?')
                    .ok('yes')
                    .cancel('no')
                    .targetEvent('event');
                $mdDialog.show(confirm).then(function () {// promise is there by using then
                    var index = vm.classifieds.indexOf(classified);
                    vm.classifieds.splice(index, 1)
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