angular.module("stock")
  .component("nyTimesComponent", {
    templateUrl: "./js/templates/nyTimesComponent.html",
    controller: function nyTimesController(nyTimesService, $scope) {
      nyTimesService.getNews().then(function(response) {
          $scope.news = response.data.response.docs;
        });
    },
    bindings: {

    }
  });
