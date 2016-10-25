angular.module("stock", ["ui.router"])
  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/");
    
    $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "./views/home.html"
    })
    .state("createUser", {
      url: "/user/new",
      templateUrl: "./views/createUser.html"
    })
    .state("profile", {
      url: "/user/:id",
      templateUrl: "./views/profile.html"
    })
    .state("profileStock", {
      url: "/user/:id/:stock",
      templateUrl: "./views/profileStock.html"
    })
    .state("pref", {
      url: "/user/:id/pref",
      templateUrl: "./views/pref.html"
    });
    //the rest of our states will go here
  });

angular.module("stock")
  .component("nyTimesComponent", {
    templateUrl: "./js/templates/nyTimesComponent.html",
    controller: function nyTimesController(nyTimesService, $scope) {
      nyTimesService.getNews().then(function(response) {
          $scope.news = response.data.response.docs;
          console.log($scope.news);
        });
    },
    bindings: {

    }
  });


angular.module('stock').component('yahooComponent', {
  templateUrl: "./js/templates/yahooComponent.html",
  controller: function yahooController(yahooService, $scope){
    yahooService.getStocks().then(function(res){
      $scope.stockData = res.data;

      var data13 = [];
      $scope.stockData.AAPL.map(function(data){
        data13.push({"date": new Date(data.date), "close": data.close});

      });
      var parseTime = d3.timeParse("%y-%b-%d");



      var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");



      var x = d3.scaleTime()
          .rangeRound([0, width]);

      var y = d3.scaleLinear()
          .rangeRound([height, 0]);

      var line = d3.line()
          .x(function(d) { return x(d.date); })
          .y(function(d) { return y(d.close); });


        x.domain(d3.extent(data13, function(d) { return d.date; }));
        y.domain(d3.extent(data13, function(d) { return d.close; }));

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y))
          .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .style("text-anchor", "end")
            .text("Price ($)");

        g.append("path")
            .datum(data13)
            .attr("class", "line")
            .attr("d", line);
});

  },
  bindings: {

  }
});

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

angular.module("stock")
  .service("yahooService", function($http){
  this.getStocks = function(){
    return $http.get("/testhole")
  };


});
