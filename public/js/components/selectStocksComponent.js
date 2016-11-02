angular.module('stock').component('selectStocksComponent', {
  templateUrl: "./js/templates/selectStocksComponent.html",
  controller: function selectStocksController(userStocksService, $scope, $stateParams, $state){

    userStocksService.getAllStocks().then(function(res){
      $scope.all_stocks = res.data;
    });  //closes userStocksService function

    $scope.addNewFavorite = function(stock) {
      userStocksService.addNewFavorite([$stateParams.id, stock])
        .then(function(res) {
          $state.reload();
      });
    };
  }, //closes controller
  bindings: []

});
