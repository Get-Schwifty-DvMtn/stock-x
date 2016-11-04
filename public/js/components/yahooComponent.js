angular.module("stock").component("yahooComponent", {
    templateUrl: "./js/templates/yahooComponent.html",
    controller: function yahooController(yahooService, nyTimesService, userStocksService, $stateParams, $scope) {

        $scope.getNewsDay = function(start, end, company) {
            var companyData = {
                company: company,
                begin: moment(start).format('YYYYMMDD'),
                end: moment(end).format('YYYYMMDD')
            };
            nyTimesService.getNews(companyData).then(function(res) {
                $scope.news = res.data.response.docs;
            });
        };

        function getDefaultNews() {
            if (!$scope.newsDate) {
                var today = new Date();
                $scope.newsDate = moment(new Date()).format('MMMM Do, YYYY');
                $scope.getNewsDay(today, today, $scope.stockSearch);
            }
        }

        userStocksService.getOneStock($stateParams.stockId).then(function(res) {
            $scope.stockName = res.data[0].name;
            $scope.stockSymbol = res.data[0].symbol;
            $scope.stockSearch = res.data[0].search_term;
            getDefaultNews();
        });

        yahooService.getStocks($stateParams.stockId).then(function(res) {
            $scope.stockData = res.data;
            $scope.stockSymbol = res.data[0].symbol;

            var data13 = [{ "values": [] }];
            $scope.stockData.map(function(data) {
                data13[0].values.push({ "date": new Date(data.date), "open": (data.open), "high": (data.high), "low": (data.low), "close": (data.close), "volume": (data.volume), "adjusted": (data.adjClose) });
            });

            var type = 'lineChart';

            $scope.changeGraph = function(num) {
                if (num === 1) {
                    type = 'lineChart';
                } else if (num === 2) {
                    type = 'candlestickBarChart';
                } else if (num === 3) {
                    type = 'ohlcBarChart';
                }
                $scope.options.chart.type = type;
            };
            $scope.data = data13;
            $scope.options = {

                chart: {
                    showLegend: false,
                    type: type,
                    height: 450,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 40,
                        left: 60
                    },
                    x: function(d) { return d['date']; },
                    y: function(d) { return d['close']; },
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
                        tickFormat: function(d) {
                            return '$' + d3.format(',.1f')(d);
                        },
                        showMaxMin: false
                    },
                    lines: {
                        dispatch: {
                            // THIS IS WHERE YOU CAN ACCESS THE POINT DATA
                            elementClick: function(e) {
                                var searchDate = e.point.date;
                                $scope.getNewsDay(searchDate, searchDate, $scope.stockName);
                            }
                        }
                    },
                    zoom: {
                        enabled: false,
                        scaleExtent: [1, 10],
                        // useInteractiveGuideline: true,
                        useFixedDomain: false,
                        useNiceScale: false,
                        horizontalOff: false,
                        verticalOff: true,
                        unzoomEventType: 'dblclick.zoom'
                    }
                }
            };
            $scope.config = {
                deepWatchOptions: true
            };
            setTimeout(function() {
                $scope.api.refresh();
            }, 500);
        });
    }
});