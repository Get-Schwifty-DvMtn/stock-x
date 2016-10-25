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
