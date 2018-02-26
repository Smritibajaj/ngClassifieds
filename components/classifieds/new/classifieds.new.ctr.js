(function () {

    "use strict";
    angular
        .module('ngClassifieds')
        .controller('newClassifiedsCtrl', function ($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory) {
            var vm = this;
            vm.closeSidebar = closeSidebar;
            vm.saveClassified = saveClassified;

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
            function saveClassified(classified) {
                if (classified) {
                    classified.contact = {
                        name: "Simmy Bajaj",
                        phone: "(995) 343 8126",
                        email: "simmy@gmail.com"
                    } 
//$emit is used to send data from child scope to parent scope and $broadcast in vice versa case.
//$on is a conjuction which is a event listner                    
                    $scope.$emit('newClassified', classified);
                    vm.sidenavOpen = false;
                }
            }
        });
})();