angular.module("stock")
  .service("yahooService", function($http){
  this.getStocks = function(){
    return $http.get("/testhole");
  };
  this.getSnapshots = function(symbols) {
    // console.log(symbols);
    return $http.post("/snapshots", symbols);
  };

});
