angular.module("stock")
  .service("yahooService", function($http){
  this.getStocks = function(stockData){
    // console.log('yahooService', stockId);
    return $http.get("/getgraphdata/" + stockData.stockSymbol + "/" + stockData.start + "/" + stockData.end); //changed
  };
  this.getSnapshots = function(symbols) {
    // console.log("service snapshots", symbols);
    return $http.post("/snapshots", symbols);
  };

});
