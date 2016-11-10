angular.module("stock")
  .service("yahooService", function($http){
  this.getStocks = function(stockData){
    return $http.get("/getgraphdata/" + stockData.stockSymbol + "/" + stockData.start + "/" + stockData.end); //changed
  };
  this.getSnapshots = function(symbols) {
    return $http.post("/snapshots", symbols);
  };

});
