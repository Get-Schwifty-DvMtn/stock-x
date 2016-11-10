angular.module('stock').component('starredStocksComponent', {
    templateUrl: "./js/templates/starredStocksComponent.html",
    controller: function starredStocksController(userStocksService, yahooService, $scope, $stateParams, $state) {
      var id;
      var usersSavedStocks;
      userStocksService.getUserInfo().then(function(res){
        id = res.data.google_id;
        getSavedStocks(id);
      })

        var getSavedStocks = function(){
          userStocksService.getSavedStocks(id).then(function(res) {
            //getting customers saved stocks for yahoo snaphsot
            var savedStockSymbols = {
                symbols: []
            };
            //passing saved stocks into a new array
            usersSavedStocks = res.data;
            for (var i = 0; i < res.data.length; i++) {
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

        $scope.removeFavorite = function(symbol) {
          for (var i = 0; i < usersSavedStocks.length; i++) {
            if (usersSavedStocks[i].company_symbol === symbol) {
              userStocksService.removeFavorite(usersSavedStocks[i].stock_id)
                .then(function(res){
                  getSavedStocks();
              });

            }
          }          
      };
    }, //closes controller
    bindings: []
});
