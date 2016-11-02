angular.module("stock").component("yahooComponent", {
  templateUrl: "./js/templates/yahooComponent.html",
  controller: function yahooController(yahooService,nyTimesService, $stateParams, $scope){
    yahooService.getStocks($stateParams.stockId).then(function(res){
      $scope.stockData = res.data;

      var data13 = [{"values": []}];
      $scope.stockData.map(function(data){
        data13[0].values.push({"date": new Date(data.date), "open": (data.open), "high": (data.high), "low": (data.low),  "close": (data.close), "volume": (data.volume), "adjusted": (data.adjClose)});
      });

      $scope.data = data13;
      $scope.options = {
                chart: {
                    showLegend: false,
                    type: 'lineChart',
                    height: 450,
                    margin : {
                        top: 20,
                        right: 20,
                        bottom: 40,
                        left: 60
                    },
                    x: function(d){ return d['date']; },
                    y: function(d){ return d['close']; },
                    duration: 100,

                    xAxis: {
                        axisLabel: 'Dates',
                        tickFormat: function(d) {
                            return d3.time.format('%x')(new Date(d));
                        },
                        showMaxMin: false
                    },

                    yAxis: {
                        axisLabel: 'Stock Price',
                        tickFormat: function(d){
                            return '$' + d3.format(',.1f')(d);
                        },
                        showMaxMin: false
                    },
                    lines: {
                        dispatch: {
                          // THIS IS WHERE YOU CAN ACCESS THE POINT DATA
                            elementClick: function(e){ console.log(e); }
                        }
                    },
                    zoom: {
                        enabled: true,
                        scaleExtent: [1, 10],
                        useFixedDomain: false,
                        useNiceScale: false,
                        horizontalOff: false,
                        verticalOff: true,
                        unzoomEventType: 'dblclick.zoom'
                    }
                }
            };
      });


      $scope.getNewsDay = function(start, end, company){
          var companyData = {
            company: company,
            begin: moment(start).format('YYYYMMDD'),
            end: moment(end).format('YYYYMMDD')
          };
          nyTimesService.getNews(companyData).then(function(res){
            $scope.news = res.data.response.docs;
          });
      };
  }
});
