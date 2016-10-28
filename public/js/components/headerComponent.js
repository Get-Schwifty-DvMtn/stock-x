angular.module('stock').component('headerComponent', {
  templateUrl: "./js/templates/headerComponent.html"

  });

  angular.module('stock').directive('animation', function() {
     return {
         restrict: "EA",
         link: function(scope, elem, attr) {
            //  $(".navicon").click(function() {
            //
            //  });
            //  $('body').on('click', '.navicon', function() {
            //     $(this).toggleClass("active");
            //     $(".wrapper").toggleClass("active");
            //     $(".wrapper-overlay").toggleClass("active");
            //     $("body").toggleClass("no-scroll");
            // });
            // $('body').on('click', '.navicon', function() {
            //     $(".wrapper").click(function() {
            //      $(this).removeClass("active");
            //      $(".navicon").removeClass("active");
            //      $(".wrapper-overlay").removeClass("active");
            //      $("body").removeClass("no-scroll");
            //  });
         }
     }
  });
