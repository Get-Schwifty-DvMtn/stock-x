angular.module('stock').component('starredStocksComponent', {
    templateUrl: "./js/templates/starredStocksComponent.html",
    controller: function starredStocksController(userStocksService, yahooService, $scope, $stateParams, $state) {
      var id = $stateParams.id;
        var getSavedStocks = userStocksService.getSavedStocks(id).then(function(res) {
            //getting customers saved stocks for yahoo snaphsot
            var savedStockSymbols = {
                symbols: []
            };
            //passing saved stocks into a new array
            for (var i = 0; i < res.data.length; i++) {
                savedStockSymbols.symbols.push(res.data[i].company_symbol);
            }
            //sending new array to backend for an api call
            yahooService.getSnapshots(savedStockSymbols).then(function(res) {
                $scope.saved_stocks = res.data;
            }, function(err) {
                console.log(err);
            });
        }); //closes selectStocksService function
        $scope.removeFavorite = function(stock) {
        userStocksService.removeFavorite({id, stock})
        .then(function(res){
          // getSavedStocks();
          $('#reload').load("./js/templates/starredStocksComponent.html" + ' #reload');
          // console.log(document.URL);
        });
      };
    }, //closes controller
    bindings: []
});
