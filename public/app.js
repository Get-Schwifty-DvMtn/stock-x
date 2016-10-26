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
    .state("loginUser", {
      url: "/user/login",
      templateUrl: "./views/loginUser.html"
    })
    .state("profile", {
      url: "/user/:id",
      abstract: true,
      templateUrl: "./views/profile.html"
    })
    .state("profile.stockSummaries", {
      url: "",
      templateUrl: "./views/stockSummaries.html"
    })
    .state("profile.profileStock", {
      url: "/stocks/:stockId",

      templateUrl: "./views/profileStock.html"
    })
    .state("profile.preferences", {
      url: "/preferences",
      templateUrl: "./views/pref.html"
    });
  });
