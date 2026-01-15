export function menuBurger() {
	const menuHeader = document.querySelector(".header__menu");
	const burger = document.querySelector(".header__burger");

	if (menuHeader && burger) {
		burger.addEventListener("click", (e) => {
			burger.classList.toggle("_active");
			menuHeader.classList.toggle("_active");
			document.body.classList.toggle("_lock");
		})
	}
}

export function activeLink() {
	const menuHeader = document.querySelector(".header__list");
	const num = Number(menuHeader.getAttribute("data-number"));
	const links = menuHeader.querySelectorAll(".header__link");
	if (links[num]) {
		links[num].classList.add("_active");
	}
}
