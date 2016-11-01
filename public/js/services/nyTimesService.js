angular.module("stock")
  .service("nyTimesService", function($http){
    this.getNews = function(companyData){
      return $http.post("/stocknews", companyData);
  };
});
