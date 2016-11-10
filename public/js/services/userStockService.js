angular.module("stock")
  .service("userStocksService", function($http){
    this.getAllStocks = function(){
      return $http.get("/getallstocks");
    };
    this.getOneStock = function(stockId){
      return $http.get("/getonestock/" + stockId);
    };
    this.getSavedStocks = function(id){
      return $http.get("/user/getsavedstocks/" + id);
    };
    this.getUserInfo = function(){
      return $http.get("getuserinfo");
    };
    this.addNewFavorite = function(symbol){
      return $http.post("/addnewfavorite", symbol);
    };
    this.removeFavorite = function(id){
      return $http.delete("/removefavorite/" + id);
    };
    this.signOut = function() {
      console.log("fired from userStocksService");
      return $http.get("/logout");
    }
    this.type = 'lineChart';
});
