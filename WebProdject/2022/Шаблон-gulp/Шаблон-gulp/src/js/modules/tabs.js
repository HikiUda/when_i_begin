const tabButtons = document.querySelectorAll('[data-tab-buttons]');

if (tabButtons) {
	tabButtons.forEach(item => {
		initTabButtons(item);
	});
}

function initTabButtons(item) {
	const tabContent = item.nextElementSibling;
	const tabContents = tabContent.querySelectorAll('[data-content]');
	const tabButtonsArray = item.querySelectorAll('[data-tab-button]');
	tabButtonsArray.forEach(item => {
		item.addEventListener('click', function () {
			const tabId = item.dataset.tabId;

			if (!item.classList.contains('_active')) {
				tabButtonsArray.forEach(item => {
					item.classList.remove('_active');
				});
				tabContents.forEach(item => {
					item.classList.remove('_active');
				});

				item.classList.add('_active');
				if (tabContents[tabId - 1]) {
					tabContents[tabId - 1].classList.add('_active');
				}
			}
		});
	});
	tabButtonsArray[0].click();
}