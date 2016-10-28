angular.module("stock")
  .service("userStocksService", function($http){
    this.getAllStocks = function(){
      return $http.get("/getallstocks");
    };
    this.getSavedStocks = function(id){
      return $http.get("/user/" + id + "/getsavedstocks");
    };
    this.getUserInfo = function(id){
      return $http.get("getuserinfo/"+id);
    };

});
