angular.module('stock').component('headerComponent', {
    templateUrl: "./js/templates/headerComponent.html",
    controller: function headerController(userStocksService, yahooService, $scope, $stateParams, $state) {
    //   console.log("stateParams",$stateParams.id);

    setTimeout(function() {

        var getUser = (function() {
            userStocksService.getUserInfo().then(function(res) {
                $scope.firstName = res.data.first_name;
                $scope.lastName = res.data.last_name;
                $scope.userPic = res.data.pic_url;
                if (res.data) {
                    $scope.loggedIn = true;
                } else {
                    $scope.loggedIn = false;
                }
            })
        })();
        console.log($scope.loggedIn);
    }, 50);

        $scope.signOut = function() {
          userStocksService.signOut();
          $scope.loggedIn = false;
          $state.go('home');
        }
    }
});

angular.module('stock').directive('animation', function() {
    return {
        restrict: "EA",
        link: function(scope, elem, attr) {
            //  $(".navicon").click(function() {
            //
            //  });
            //  $('body').on('click', '.navicon', function() {
            //     $(this).toggleClass("active");
            //     $(".wrapper").toggleClass("active");
            //     $(".wrapper-overlay").toggleClass("active");
            //     $("body").toggleClass("no-scroll");
            // });
            // $('body').on('click', '.navicon', function() {
            //     $(".wrapper").click(function() {
            //      $(this).removeClass("active");
            //      $(".navicon").removeClass("active");
            //      $(".wrapper-overlay").removeClass("active");
            //      $("body").removeClass("no-scroll");
            //  });
        }
    };
});
