$(document).ready(function () {

	$('body').on('click', '.navicon',  function() {
		$('.navicon').toggleClass("active");
		$('.header').toggleClass("active");
		$(".wrapper").toggleClass("active");
		$(".wrapper-overlay").toggleClass("active");
		$("body").toggleClass("no-scroll");
	});
	$('nav-component').on('click', function() {
		 $('.navicon').toggleClass("active");
		 $('.header').toggleClass("active");
		 $(".wrapper").toggleClass("active");
		 $(".wrapper-overlay").toggleClass("active");
		 $("body").toggleClass("no-scroll");
	});
	$('.wrapper').on('click', function() {
		// console.log('fired')
		$(this).removeClass("active");
		$(".navicon").removeClass("active");
		$('.header').removeClass("active");
		$(".wrapper-overlay").removeClass("active");
		$("body").removeClass("no-scroll");
	});
	// $(".wrapper").click(function() {
	// 	console.log('fired')
	// 	$(this).removeClass("active");
	// 	$(".navicon").removeClass("active");
	// 	$(".wrapper-overlay").removeClass("active");
	// 	$("body").removeClass("no-scroll");
	// });


	$(function(){
	  $(".element").typed({
		strings: ["Need real-time stock data?", "Want some hot news?", "Introducing our interactive graph tying the two together", "Try it for yourself"],
		typeSpeed: 0,
		backSpeed: -25,
		backDelay: 1000
	  });
	});

});
