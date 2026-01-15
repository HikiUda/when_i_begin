import * as flsFunctions from "./modules/functions.js";
import * as menuBurger from "./simple/burger.js";
import Swiper from 'swiper';

flsFunctions.isWebp();

menuBurger.menuBurger();
menuBurger.activeLink();

//SLIDER

const swiper = new Swiper(".home-slider__swiper", {
	pagination: {
		el: '.home-slider__swiper-pagination',
		type: 'bullets',
		clickable: true,
	},
	slidesPerView: 1,
});

//TAB-GALARY=============================

const galaryTabsRows = document.querySelectorAll(".tab-galary__row");
const galaryPages = document.querySelectorAll(".galary-page");

if (galaryTabsRows) {
	galaryTabsRows.forEach(item => {
		const galaryTabs = item.querySelectorAll(".tab-galary__button");
		initGalaryTabs(galaryTabs);
	});
}

function initGalaryTabs(galaryTabs) {
	if (galaryTabs) {
		checkActivePage(galaryTabs);
		galaryTabs.forEach(tab => {
			tab.addEventListener("click", () => {
				switchOffTab(galaryTabs);
				switchOnTab(tab);
			});
		});
	}
}

function switchOffTab(galaryTabs) {
	galaryTabs.forEach(tab => {
		tab.classList.remove("_active");
	});
}
function switchOnTab(tab) {
	tab.classList.add("_active");
	nextGalaryPage(tab);
}

function nextGalaryPage(tab) {
	const indexTab = tab.dataset.tabGalary;
	galaryPages.forEach(page => {
		page.classList.remove("_active");
	});
	galaryPages[indexTab].classList.add("_active");
}

function checkActivePage(galaryTabs) {
	let i = 1;
	galaryTabs.forEach(tab => {
		if (tab.classList.contains("_active")) {
			nextGalaryPage(tab);
			i--;
		}
	})
	if (i) {
		switchOnTab(galaryTabs[0]);
	}
}

