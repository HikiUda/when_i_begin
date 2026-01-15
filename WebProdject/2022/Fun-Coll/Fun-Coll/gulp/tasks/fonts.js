import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
	// finding the files of the fonts .otf
	return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FONTS",
				message: "Error: <%= error.message %>"
			})
		))
		// Converting fonts in .ttf
		.pipe(fonter({
			formats: ['ttf']
		}))
		// Uplaad in source folder
		.pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
	// finding the files of the fonts .ttf
	return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FONTS",
				message: "Error: <%= error.message %>"
			})
		))
		// Converting in .woff
		.pipe(fonter({
			formats: ['woff']
		}))
		// Upload in source folder
		.pipe(app.gulp.dest(`${app.path.build.fonts}`))
		// Finding the files of fonts .ttf
		.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
		// Converting in .woff2
		.pipe(ttf2woff2())
		// Upload in folder with result
		.pipe(app.gulp.dest(`${app.path.build.fonts}`));
}

export const fontsStyle = () => {
	// the file of styles of conecting fonts
	let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
	// Checking that files of fonts exist
	fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
		if (fontsFiles) {
			// Checking that file of styles for connecting fonts exist
			if (!fs.existsSync(fontsFile)) {
				// if file don't exist, create one
				fs.writeFile(fontsFile, '', cb);
				let newFileOnly;
				for (var i = 0; i < fontsFiles.length; i++) {
					// Writing connecting fonts in the file of style
					let fontFileName = fontsFiles[i].split('.')[0];
					if (newFileOnly !== fontFileName) {
						let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
						let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
						let fontStyle = fontFileName.split('-')[1].includes("Italic") ? "italic" : "normal";
						fontWeight = fontWeight.includes("Italic") ? fontWeight.replace("Italic", "") : fontWeight;
						if (fontWeight.toLowerCase() === 'thin') {
							fontWeight = 100;
						} else if (fontWeight.toLowerCase() === 'extralight') {
							fontWeight = 200;
						} else if (fontWeight.toLowerCase() === 'light') {
							fontWeight = 300;
						} else if (fontWeight.toLowerCase() === 'medium') {
							fontWeight = 500;
						} else if (fontWeight.toLowerCase() === 'semibold') {
							fontWeight = 600;
						} else if (fontWeight.toLowerCase() === 'bold') {
							fontWeight = 700;
						} else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
							fontWeight = 800;
						} else if (fontWeight.toLowerCase() === 'black') {
							fontWeight = 900;
						} else {
							fontWeight = 400;
						}
						fs.appendFile(fontsFile,
							`@font-face{
								font-family: ${fontName};
								font-display: swap;
								src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");
								font-weight: ${fontWeight};
								font-style: ${fontStyle};
							}\r\n`, cb);
					}
				}
			} else {
				// if file exist, send message
				console.log('The file exist already');
			}
		}
	});

	return app.gulp.src(`${app.path.srcFolder}`);
	function cb() { }
}