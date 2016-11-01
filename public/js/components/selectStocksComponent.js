angular.module('stock').component('selectStocksComponent', {
  templateUrl: "./js/templates/selectStocksComponent.html",
  controller: function selectStocksController(userStocksService, $scope, $stateParams, $state){
console.log("these are the state Params: ", $stateParams);
    userStocksService.getAllStocks().then(function(res){
      console.log("select", res.data);
      $scope.all_stocks = res.data;
    });  //closes userStocksService function

    $scope.addNewFavorite = function(stock) {

      userStocksService.addNewFavorite([$stateParams.id, stock])
        .then(function(res) {
          console.log("newStock - res",res);
          console.log("new stock symbol is: ", stock);
          // $state.go($state.current, {}, {reload: true});
          // $window.location.reload();
          $state.reload();
      });

    };




  }, //closes controller
  bindings: []

});
