angular.module("stock")
  .service("nyTimesService", function($http){
  this.getNews = function(){
    return $http({
      method: "GET",
      // url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
      url: "http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=romney&facet_field=day_of_week&begin_date=20120101&end_date=20120101&api-key=8c027c7e64c74f42a29665437c7db2a7",
      // qs: {
      //   'api-key': config.nytAPI,
      //   'q': "Apple",
      //   'fq': "news_desk:(Business)",
      //   'begin_date': "20161022",
      //   'end_date': "20161024",
      //   'sort': "newest",
      //   'fl': "web_url,headline,snippet"
      // },
    });
  };
});
