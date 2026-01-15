'use strict';

import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

//Динамический адаптив
//import "./modules/dynamic.js";

//Спойлеры
//import "./modules/spolers.js";

//Табы
import "./modules/tabs.js";

//Попап
//import "./modules/popup.js";

//Звездный рейтинг
//import "./modules/star-reting.js"

//Бургер
const burgerMenu = document.querySelector(".menu__list");
const burgerIcon = document.querySelector(".menu__burger");

if (burgerIcon && burgerMenu) {
	burgerIcon.addEventListener("click", (e) => {
		burgerMenu.classList.toggle("_active");
		burgerIcon.classList.toggle("_active");
		document.body.classList.toggle("_lock");
	});
}

//====================================
import Swiper from 'swiper';


const swiper = new Swiper('.comment-slider__swiper', {
	// If we need pagination
	pagination: {
		el: '.comment-slider__swiper-pagination',
		type: 'bullets',
	},
});
//===============================================================
const likes = document.querySelectorAll("._icon-like");
if (likes) {
	likes.forEach(like => {
		like.addEventListener("click", (e) => {
			like.classList.toggle("_like");
		});
	});
}

