import { useEffect, useRef } from "react";

import { useLocalStorage } from "../../utils/useLocalStorage";
import detectDarkMode from "../../utils/detectDarkMode";

import sun from "./../../img/icons/sun.svg";
import moon from "./../../img/icons/moon.svg";

const BtnDarkMode = (props) => {

	const btnRef = useRef(null);

	const [darkMode, setDarkMode] = useLocalStorage(
		'darkMode',
		detectDarkMode()
	);

	useEffect(() => {
		if (darkMode === 'dark') {
			document.body.classList.add('dark');
			btnRef.current.classList.add('dark-mode-btn--active')
		} else {
			document.body.classList.remove('dark');
			btnRef.current.classList.remove('dark-mode-btn--active')
		}
	}, [darkMode])

	useEffect(() => {
		window
			.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change", (event) => {
				const newColorScheme = event.matches ? "dark" : "light";
				setDarkMode(newColorScheme);
			});
	}, [setDarkMode])

	const toggleDarkMode = () => {
		setDarkMode((currentMode) => {
			return currentMode === 'light' ? 'dark' : 'light'
		})
	}

	return (
		<button ref={btnRef} className="dark-mode-btn" onClick={toggleDarkMode} >
			<img src={sun} alt="Light mode" className="dark-mode-btn__icon" />
			<img src={moon} alt="Dark mode" className="dark-mode-btn__icon" />
		</button>
	);
}

export default BtnDarkMode;