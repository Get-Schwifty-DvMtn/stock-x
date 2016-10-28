$(document).ready(function () {

	$('body').on('click', '.navicon', function() {
		$('.navicon').toggleClass("active");
		$('.header').toggleClass("active");
		$(".wrapper").toggleClass("active");
		$(".wrapper-overlay").toggleClass("active");
		$("body").toggleClass("no-scroll");
	});

	$('.wrapper').on('click', function() {
		console.log('fired')
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
		strings: ["First sentence.", "Second sentence."],
		typeSpeed: 0
	  });
	});

});
