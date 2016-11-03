angular.module('stock').component('starredStocksComponent', {
    templateUrl: "./js/templates/starredStocksComponent.html",
    controller: function starredStocksController(userStocksService, yahooService, $scope, $stateParams, $state) {
      var id = $stateParams.id;
        var getSavedStocks = function(){
          userStocksService.getSavedStocks(id).then(function(res) {
            //getting customers saved stocks for yahoo snaphsot
            var savedStockSymbols = {
                symbols: []
            };
            //passing saved stocks into a new array
            for (var i = 0; i < res.data.length; i++) {
            //   console.log(res.data[i]);
                savedStockSymbols.symbols.push(res.data[i].company_symbol);
            }
            //sending new array to backend for an api call
            yahooService.getSnapshots(savedStockSymbols).then(function(res) {
                $scope.saved_stocks = res.data;
            }, function(err) {
                console.log(err);
            });
          });
        } //closes getSavedStocks function
        getSavedStocks();
        $scope.removeFavorite = function(stock) {
        userStocksService.removeFavorite({id, stock})
        .then(function(res){
          getSavedStocks();
        });
      };
    }, //closes controller
    bindings: []
});
