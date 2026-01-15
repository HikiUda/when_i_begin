const videoBlocks = document.querySelectorAll('.video-btn');

if (videoBlocks) {
	videoBlocks.forEach(videoBlock => {
		if (videoBlock) {
			const pause = videoBlock.querySelector('.pause')
			const play = videoBlock.querySelector('.play')
			pause.addEventListener('click', () => {
				pauseVideo();
			});
			play.addEventListener('click', () => {
				playVideo();
			});


			function pauseVideo() {
				pause.classList.remove('_active');
				videoBlock.querySelector('.video-btn__span-pause').classList.remove('_active');
				play.classList.add('_active');
				videoBlock.querySelector('.video-btn__span-play').classList.add('_active');
			}
			function playVideo() {
				play.classList.remove('_active');
				videoBlock.querySelector('.video-btn__span-play').classList.remove('_active');
				pause.classList.add('_active');
				videoBlock.querySelector('.video-btn__span-pause').classList.add('_active');
			}
		}
	})
}



// LIST

const listNames = document.querySelector('.specs__list-names');
const listDiscriptions = document.querySelector('.specs__list-discriptions');

if (listNames && listDiscriptions) {
	console.log(listNames);

	listDiscriptions.addEventListener('click', showDiscription);

	function showDiscription() {
		listNames.classList.toggle('_active');
		listDiscriptions.classList.toggle('_active');
	}

}
