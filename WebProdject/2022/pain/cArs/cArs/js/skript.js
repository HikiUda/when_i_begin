$(document).ready(function () {
	$('.header__burger').click(function (event) {
		$('.header__burger,.header__menu,.header__language').toggleClass('active');
		$('body').toggleClass('lock');
	});
});