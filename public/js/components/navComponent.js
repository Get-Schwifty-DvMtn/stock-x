angular.module('stock').component('navComponent', {
    templateUrl: "./js/templates/navComponent.html",
    controller: function navController(userStocksService, $scope, $stateParams, $state) {
        //   console.log("stateParams",$stateParams.id);

        setTimeout(function() {

            var getUser = (function() {
                userStocksService.getUserInfo().then(function(res) {
                    if (res.data) {
                        $scope.loggedIn = true;
                    } else {
                        $scope.loggedIn = false;
                    }
                });
            })();
        }, 50);

        $scope.checkSignin = function Bob () {
          if ($scope.loggedIn === true) {
            $state.go('profile.stockSummaries');
          }
          else {
            swal('You need to sign in first.');
          }
        };
    }
});
