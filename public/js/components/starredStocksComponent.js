public/js/components/selectStocksComponent.js angular.module('stock').component('starredStocksComponent', {
    templateUrl: "./js/templates/starredStocksComponent.html",
    controller: function starredStocksController(userStocksService, yahooService, $scope, $stateParams, $state) {
      var id = $stateParams.id;
        userStocksService.getSavedStocks(id).then(function(res) {
            // console.log("starred", res.data);

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
        userStocksService.getUserInfo(id).then(function(res) {
            // console.log(res);
            $scope.firstName = res.data.firstName;
            $scope.lastName = res.data.lastName;
            $scope.userPic = res.data.pic;
        });


        $scope.removeFavorite = function(stock) {
          console.log("id: " + id + ", stock is: " + stock);
          var obj = {
            id: id,
            stock: stock
          };
          userStocksService.removeFavorite(obj)
          .then(function(res){
            console.log("id: " + obj.id + ", stock is: " + obj.stock + ", res is: " + res);
            $state.reload();
          });
        };

    }, //closes controller
    bindings: []

});
