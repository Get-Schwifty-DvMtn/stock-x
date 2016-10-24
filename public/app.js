angular.module("stock", ["ui.router"])
  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state("home", {
      url: "/"
    });
    //the rest of our states will go here
  });
