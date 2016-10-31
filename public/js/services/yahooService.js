angular.module("stock")
  .service("yahooService", function($http){
  this.getStocks = function(stockId){
    console.log('yahooService', stockId);
    return $http.get("/testhole/" + stockId);
  };
  this.getSnapshots = function(symbols) {
    // console.log(symbols);
    return $http.post("/snapshots", symbols);
  };

});
