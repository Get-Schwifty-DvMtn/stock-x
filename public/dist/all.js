angular.module("stock", ["ui.router"])
  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state("home", {
      url: "/"
    });
    //the rest of our states will go here
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
  .service("yahooService", function($http){
  this.getStocks = function(){
    return $http.get("/testhole")
  };


});
