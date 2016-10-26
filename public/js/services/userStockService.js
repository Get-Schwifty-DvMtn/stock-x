angular.module("stock")
  .service("selectStocksService", function($http){
    this.getAllStocks = function(){
      return $http.get("/getallstocks");
    };
    this.getSavedStocks = function(id){
      return $http.get("/user/" + id + "/getsavedstocks");
    };


});
