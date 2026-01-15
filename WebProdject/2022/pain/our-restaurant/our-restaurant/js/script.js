const slides = document.querySelectorAll('.comment__slide'),
	dots = document.querySelectorAll('.comment__dot');

let index = 0;

const activeSlide = n => {
	for (slide of slides) {
		slide.classList.remove('active');
	}
	slides[n].classList.add('active');
}

const activeDots = n => {
	for (dot of dots) {
		dot.classList.remove('active');
	}
	dots[n].classList.add('active');
}

const prepareCurrentSlide = ind => {
	activeDots(ind);
	activeSlide(ind);
}

const nextSlide = () => {
	if (index == slides.length - 1) {
		index = 0
		prepareCurrentSlide(index);
	} else {
		index++
		prepareCurrentSlide(index);
	}
}

dots.forEach((item, indexDot) => {
	item.addEventListener('click', () => {
		index = indexDot
		prepareCurrentSlide(index);
	})
})

setInterval(nextSlide, 3000);

// burger

const menuBurger = document.querySelector('.header__burger')
const menuBlock = document.querySelector('.header__block')

if (menuBurger) {
	menuBurger.addEventListener('click', function (e) {
		document.body.classList.toggle('_lock');
		menuBlock.classList.toggle('_active');
		menuBurger.classList.toggle('_active');
	})
}