(function () {

    "use strict";
    angular
        .module('ngClassifieds')
        .controller('editClassifiedsCtrl', function ($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory) {
            var vm = this;
            vm.closeSidebar = closeSidebar;
            vm.saveEdit = saveEdit;
            vm.classified = $state.params.classified;

            $timeout(function () {
                $mdSidenav('left').open();
            }, 2000);
// watchers is a special feature provided by $scope element and it follows the code and whenever any value is changed, a function is callback.
            $scope.$watch('vm.sidenavOpen', function (sidenav) {
                if (sidenav === false) {
                    $mdSidenav('left')
                        .close()
                        .then(function () {
                            $state.go('classifieds')
                        })

                }
            });
            //function responsible for closing the sidebar
            function closeSidebar() { //calbacj function
                vm.sidenavOpen = false;
            }

            function saveEdit() {
                $scope.$emit('editSaved','Edit Saved!');
                vm.sidenavOpen = false;
            }
        });
})();