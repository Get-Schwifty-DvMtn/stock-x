angular.module("stock").component("yahooComponent", {
    templateUrl: "./js/templates/yahooComponent.html",
    controller: function yahooController(yahooService, nyTimesService, userStocksService, $stateParams, $scope, $state) {
        setTimeout(function() {
            var getUser = (function() {
                userStocksService.getUserInfo().then(function(res) {

                    if (res.data) {
                        $scope.loggedIn = true;
                    } else {
                        $scope.loggedIn = false;
                    }
                });
            })();
        }, 50);
        $scope.uiRouterState = $state;
        $scope.getNewsDay = function(start, end, company) {
            var companyData = {
                company: company,
                begin: moment(start).format('YYYYMMDD'),
                end: moment(end).format('YYYYMMDD')
            };
            // console.log("companyData:", companyData);
            $scope.newsDate = moment(start).format('MMMM Do, YYYY');
            nyTimesService.getNews(companyData).then(function(res) {
                $scope.news = res.data.response.docs;
            });
        }; // ends getNewsDay

        function getDefaultNews() {
            if (!$scope.newsDate) {
                var today = new Date();
                $scope.newsDate = moment(new Date()).format('MMMM Do, YYYY');
                $scope.getNewsDay(today, today, $scope.stockSearch);
            }
        } // ends getDefaultNews
        userStocksService.getOneStock($stateParams.stockId).then(function(res) {
            $scope.stockName = res.data[0].name;
            $scope.stockSymbol = res.data[0].symbol;
            $scope.stockSearch = res.data[0].search_term;
            // console.log("search term coming in:", res.data[0].search_term);
            getDefaultNews();
            $scope.setGraphRange(12);


        }); //ends mainService.getOneStock function call

        
        var today = moment(new Date());
    
        $scope.setGraphRange = function(monthsStart) {  // for some reason this closing bracket is showing as the controller's closing bracket
    
            var stockData = {
                stockSymbol: $scope.stockSymbol,
                start: moment(new Date()).subtract(monthsStart, "months").format("YYYY-MM-DD"),
                end: today.format("YYYY-MM-DD")

            };
            yahooService.getStocks(stockData).then(function(res) {
                $scope.stockData = res.data;
                $scope.stockSymbol = res.data[0].symbol;
    //             console.log(res.data);

                var data13 = [
                    {
                        "values": []
                    }
                ];
                $scope.stockData.map(function(data) {
                    data13[0].values.push({
                        "date": new Date(data.date),
                        "open": (data.open),
                        "high": (data.high),
                        "low": (data.low),
                        "close": (data.close),
                        "volume": (data.volume),
                        "adjusted": (data.adjClose)
                    }); // ends the object in the .push
                }); // ends $scope.stockData.map function

                //
                // var type = 'lineChart';
                //
                $scope.changeGraph = function(num) {
                    if (num === 1) {
                        type = 'lineChart';
                        userStocksService.type = type;
                    } else if (num === 2) {
                        type = 'candlestickBarChart';
                        userStocksService.type = type;
                    } else if (num === 3) {
                        type = 'ohlcBarChart';
                        userStocksService.type = type;
                    }
                    $scope.options.chart.type = type;
                };
    //
                $scope.data = data13;
                $scope.options = {
    //
                    chart: {
                        showLegend: false,
                        type: userStocksService.type,
                        height: 450,
                        margin: {
                            top: 20,
                            right: 20,
                            bottom: 40,
                            left: 60
                        },
                        x: function(d) {
                            return d['date'];
                        },
                        y: function(d) {
                            return d['close'];
                        },
                        duration: 100,
    //
                        xAxis: {
                            axisLabel: 'Dates',
                            tickFormat: function(d) {
                                return d3.time.format('%x')(new Date(d));
                            },
                            showMaxMin: false
                        },
    //
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
                                    $scope.getNewsDay(searchDate, searchDate, $scope.stockSearch);
                                }
                            }
                        },
                        interactiveLayer: {
                            dispatch: {
                                // THIS IS WHERE YOU CAN ACCESS THE POINT DATA
                                elementClick: function(e) {
                                    var date = (new Date(e.pointXValue));
                                    var searchDate = date;
                                    $scope.getNewsDay(searchDate, searchDate, $scope.stockSearch);
                                }
                            }
                        },
                        zoom: {
                            enabled: false,
                            scaleExtent: [
                                1, 10
                            ],
                            // useInteractiveGuideline: true,
                            useFixedDomain: false,
                            useNiceScale: false,
                            horizontalOff: false,
                            verticalOff: true,
                            unzoomEventType: 'dblclick.zoom'
                        }
                    } // this ends chart
                }; // this ends scope.options
                $scope.config = {
                    deepWatchOptions: true
                }; // end scope.config
                setTimeout(function() {
                    $scope.api.refresh();
                }, 500);
            }); // ends yahooService.getStocks.then function
        }; //ends setGraphRange function
    } // ends controller
}); // Angular.module
