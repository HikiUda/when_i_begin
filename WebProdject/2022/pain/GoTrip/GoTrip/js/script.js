'use strict'

const body = document.body;

// BURGER
const headers = document.querySelectorAll(".header__row");
if (headers) {
	headers.forEach(item => {
		const burger = item.querySelector('.header__burger');
		const headerMenu = item.querySelector('.header__menu');

		if (burger && headerMenu) {
			burger.addEventListener('click', () => {
				burger.classList.toggle('_active');
				headerMenu.classList.toggle('_active');
				body.classList.toggle('_lock');
			});
		}
	});
}

// DESTINATIONS SLIDER

const distinationsSlider = new Swiper('.slider__slider', {
	navigation: {
		nextEl: '.slider__button-next',
	},
	slidesPerView: 1.1,
	spaceBetween: 20,
	loop: true,

	breakpoints: {
		1300: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
		1200: {
			slidesPerView: 2.3,
			spaceBetween: 30,
		},
		991: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		768: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		500: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
	},
});

// CUSTOMERS SLIDER

const customersSlider = new Swiper('.slider-customers', {
	autoHeight: true,
	autoplay: {
		delay: 3000,
	},
	loop: true,
	breakpoints: {
		992: {
			autoHeight: false,
		},
	},
});

//STAR RETING

const retings = document.querySelectorAll('[data-reting-value]');

if (retings) {
	retings.forEach(itemReting => {
		const retingList = itemReting.querySelectorAll("[data-reting]");
		const reting = Array.prototype.slice.call(retingList);
		const retingName = itemReting;
		let retingValue = retingName.dataset.retingValue;
		initReting();

		function initReting() {
			reting.forEach(item => {
				item.addEventListener("click", () => {
					const itemValue = item.getAttribute('data-reting');
					if (retingValue == itemValue) {
						retingValue = 0;
						setReting(retingValue);
					} else {
						retingValue = itemValue;
						setReting(itemValue);
					}
				});
				item.addEventListener("mouseenter", () => {
					const itemValue = item.getAttribute('data-reting');
					retingName.dataset.retingValue = 0;
					setReting(itemValue);
				});
				item.addEventListener("mouseleave", () => {
					setReting(retingValue);
				});
			});
		}
		function setReting(value) {
			retingName.dataset.retingValue = value;
		}
	});
}
