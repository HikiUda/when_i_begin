// BURGER
const burger = document.querySelector('.header__burger'),
	menu = document.querySelector('.header__menu');

if (menu && burger) {
	burger.addEventListener('click', () => {
		burger.classList.toggle('_active');
		menu.classList.toggle('_active');
		document.body.classList.toggle('_lock');
	})
}