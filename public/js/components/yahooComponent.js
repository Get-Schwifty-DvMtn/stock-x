
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
        margin = {top: 20, right: 50, bottom: 30, left: 50},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        var bisectDate = d3.bisector(function(d) { return d.date;}).left,
            formatValue = d3.format(",.2f"),
            formatCurrency = function(d) { return "$" + formatValue(d); };

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

            var focus = svg.append("g")
      .attr("class", "focus")
      .style("display", "none");

  focus.append("circle")
      .attr("r", 4.5);

  focus.append("text")
      .attr("x", 9)
      .attr("dy", ".35em");

  svg.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", function() { focus.style("display", null); })
      .on("mouseout", function() { focus.style("display", "none"); })
      .on("mousemove", mousemove);

  function mousemove() {
    var x0 = x.invert(d3.mouse(this)[0]),
        i = bisectDate(data13, x0, 1),
        d0 = data13[i - 1],
        d1 = data13[i],
        d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");
    focus.select("text").text(formatCurrency(d.close));
}

});

  },
  bindings: {

  }
});
