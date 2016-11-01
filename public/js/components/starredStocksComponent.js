angular.module('stock').component('starredStocksComponent', {
<<<<<<< HEAD
    templateUrl: "./js/templates/starredStocksComponent.html",
    controller: function starredStocksController(userStocksService, yahooService, $scope, $stateParams) {

        userStocksService.getSavedStocks($stateParams.id).then(function(res) {
            // console.log("starred", res.data);
=======
  templateUrl: "./js/templates/starredStocksComponent.html",
  controller: function starredStocksController(userStocksService, yahooService, $scope, $stateParams){
    console.log($stateParams);
    userStocksService.getSavedStocks($stateParams.id)
      .then(function(res){
        console.log("starred", res.data);
>>>>>>> master

            //getting customers saved stocks for yahoo snaphsot
            var savedStockSymbols = {
                symbols: []
            };
            //passing saved stocks into a new array
            for (var i = 0; i < res.data.length; i++) {
                savedStockSymbols.symbols.push(res.data[i].company_symbol);
            }
            // console.log(savedStockSymbols);
            //sending new array to backend for an api call
            yahooService.getSnapshots(savedStockSymbols).then(function(res) {
                $scope.saved_stocks = res.data;
            }, function(err) {
                console.log(err);
            });

        }); //closes selectStocksService function
        userStocksService.getUserInfo($stateParams.id).then(function(res) {
            // console.log(res);
            $scope.firstName = res.data.firstName;
            $scope.lastName = res.data.lastName;
            $scope.userPic = res.data.pic;
        });

    }, //closes controller
    bindings: []

<<<<<<< HEAD
})
=======
});
>>>>>>> master
//
// .controller('testCtrl', function($scope, $stateParams) {
//
//   console.log("testCtrl", $stateParams);
// });
