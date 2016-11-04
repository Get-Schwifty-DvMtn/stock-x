angular.module("stock")
  .service("yahooService", function($http){
  this.getStocks = function(stockId){
    // console.log('yahooService', stockId);
    return $http.get("/testhole/" + stockId + "/" + startDate + "/" + endDate); //changed
  };
  this.getSnapshots = function(symbols) {
    // console.log("service snapshots", symbols);
    return $http.post("/snapshots", symbols);
  };

});
