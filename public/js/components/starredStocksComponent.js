angular.module('stock').component('starredStocksComponent', {
  templateUrl: "./js/templates/starredStocksComponent.html",
  controller: function starredStocksController(userStocksService, $scope, $stateParams){

    userStocksService.getSavedStocks($stateParams.id)
      .then(function(res){

        // console.log("starred", res.data);
        $scope.saved_stocks = res.data;
    }); //closes selectStocksService function
  userStocksService.getUserInfo($stateParams.id).then(function(res){
    console.log(res);
    $scope.firstName= res.data.firstName;
    $scope.lastName= res.data.lastName;
    $scope.userPic= res.data.pic;
  });

  }, //closes controller
  bindings: []

});
