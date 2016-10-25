ngular.module('stock').component('starredStocksComponent', {
  templateUrl: "./js/templates/starredStocksComponent.html",
  controller: function starredStocksController(userStocksService, $scope, $stateParams){

    userStocksService.getSavedStocks($stateParams.id)
      .then(function(res){

        console.log(res.data);
        $scope.saved_stocks = res.data;



    }); //closes selectStocksService function

  }, //closes controller
  bindings: []

});
