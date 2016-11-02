angular.module("stock")
  .service("userStocksService", function($http){
    this.getAllStocks = function(){
      return $http.get("/getallstocks");
    };
    this.getOneStock = function(id){
      return $http.get("/getonestock/" + id);
    };
    this.getSavedStocks = function(id){
      return $http.get("/user/" + id + "/getsavedstocks");
    };
    this.getUserInfo = function(id){
      return $http.get("getuserinfo/"+id);
    };
    this.addNewFavorite = function(symbol){
      return $http.post("/addnewfavorite", symbol);
    };
    this.removeFavorite = function(toDelete){
      return $http.delete("/removefavorite/" + toDelete.id + "/" +  toDelete.stock );
    };
});
