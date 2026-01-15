const burger = document.querySelector('.menu__icon'),
	menu = document.querySelector('.menu'),
	body = document.body;

if (burger && menu) {
	burger.addEventListener('click', () => {
		burger.classList.toggle('_active');
		menu.classList.toggle('_active');
		body.classList.toggle('_lock');
	})
}

//Filter

const filter = document.querySelector('.filter');

if (filter) {
	const items = filter.querySelectorAll('.block-filter')

	items.forEach(item => {
		item.addEventListener('click', event => {
			item.querySelector('.block-filter__dropdown').classList.toggle('_active');
			item.querySelector('.block-filter__icon').classList.toggle('_active');

			if (event.target.classList.contains('block-filter__item')) {
				item.querySelector('.block-filter__value').textContent = event.target.textContent;
			}
		})
	})
}

//swiper

const popularSlider = new Swiper('.popular-slider', {
	spaceBetween: 20,
	slidesPerView: 1,
	// Navigation arrows
	navigation: {
		nextEl: '.popular-slider-next',
		prevEl: '.popular-slider-prev',
	},
	breakpoints: {
		992: {
			slidesPerView: 3,
		},
		640: {
			slidesPerView: 2,
		}
	}
});
const reviewsSlider = new Swiper('.slider-reviews', {
	spaceBetween: 20,
	slidesPerView: 1,
	autoHeight: true,
	// Navigation arrows
	navigation: {
		nextEl: '.slider-reviews-next',
		prevEl: '.slider-reviews-prev',
	},
});

//galary

const gallaryItems = document.querySelectorAll('.galary__item');

if (gallaryItems.length > 0) {
	gallaryItems.forEach(item => {
		new Swiper(item, {
			slidesPerView: 1,
			autoplay: {
				delay: 5000,
			},
			effect: 'fade',
		})
	})
}