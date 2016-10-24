angular.module("stock")
  .service("yahooService", function($http){
  this.getStocks = function(){
    return $http.get("/testhole")
  };


});
