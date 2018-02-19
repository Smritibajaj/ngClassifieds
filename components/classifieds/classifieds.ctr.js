(function () {

    angular
        .module("ngClassifieds")
        .controller("classifiedsCtrl", function ($http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {
           
           var vm= this;
           vm.openSidebar = openSidebar;
           vm.closeSidebar = closeSidebar;
           vm.saveClassified = saveClassified;
           vm.editClassified = editClassified;
           vm.saveEdit = saveEdit;
           vm.deleteClassified = vm.deleteClassified;
           vm.classifieds;
           vm.categories;
           vm.editing;
           vm.classified;


            classifiedsFactory.getClassifieds().then(function (classifieds) {
                vm.classifieds = classifieds.data;//  vm.classifieds is an array
                vm.categories = getCategories(vm.classifieds);
            });// factoryname.function.work

            var contact = {
                name: "Simmy Bajaj",
                phone: "(995) 343 8126",
                email: "simmy@gmail.com"
            }

            //vm.categories = getCategories(vm.classifieds);

        function openSidebar () {
                $mdSidenav('left').open();
                //open function
            }
           function closeSidebar () {
                $mdSidenav('left').close();
                //close function
            }/// to get rid of $scope we take it as a function and described it above
        function saveClassified (classified) {
                if (classified) {
                classified.contact = contact;
                    vm.classifieds.push(classified);
                    vm.classified = {};// empty object feild
                    closeSidebar();// close navbar
                    showToast("Classified saved");
                }
            }

        function editClassified (classified) {
                vm.editing = true;
                openSidebar();
                vm.classified = classified;

            }

        function saveEdit (classified) {
                vm.editing = false;
                vm.classified = {};
                closeSidebar();
                showToast("Edited successfully");
            }

            // we will do splice to delete from frontend ie screen
        function deleteClassified (event, classified) {
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