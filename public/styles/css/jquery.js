$(document).ready(function () {

$(".navicon").click(function() {
	$(this).toggleClass("active");
	$(".wrapper").toggleClass("active");
	$(".wrapper-overlay").toggleClass("active");
	$("body").toggleClass("no-scroll");
});
$(".wrapper").click(function() {
	$(this).removeClass("active");
	$(".navicon").removeClass("active");
	$(".wrapper-overlay").removeClass("active");
	$("body").removeClass("no-scroll");
});

});
