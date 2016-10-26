angular.module('stock').component('selectStocksComponent', {
  templateUrl: "./js/templates/selectStocksComponent.html",
  controller: function selectStocksController(userStocksService, $scope){

    userStocksService.getAllStocks().then(function(res){
      console.log("select", res.data);
      $scope.all_stocks = res.data;



    }); //closes userStocksService function

  }, //closes controller
  bindings: []

});
