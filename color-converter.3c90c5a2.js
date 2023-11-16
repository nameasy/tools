const inputElement = document.querySelector('.converter__input');
const resultElement = document.querySelector('.converter__result');
const errorElement = document.querySelector('.converter__error');
const tableElement = document.querySelector('.converter__table');
const captionElements = document.querySelectorAll('.converter__caption');
const nameElement = document.querySelector('.converter__text--name');
const rgbElement = document.querySelector('.converter__text--rgb');
const hexElement = document.querySelector('.converter__text--hex');
const hslElement = document.querySelector('.converter__text--hsl');
const hwbElement = document.querySelector('.converter__text--hwb');
const cmykElement = document.querySelector('.converter__text--cmyk');
const ncolElement = document.querySelector('.converter__text--ncol');
inputElement.addEventListener('change', validateColor);
inputElement.addEventListener('input', convertColor);
inputElement.addEventListener('keydown', submitOnEnter);

function convertColor() {
	const inputValue = inputElement.value;
	if (inputValue !== '') {
		const color = inputValue.toLowerCase().replace(/;/g, ',');
		const w3ColorObject = w3color(color);
		if (w3ColorObject.valid) {
			tableElement.style.display = 'table';
			resultElement.style.backgroundColor = w3ColorObject.toRgbaString();
			if (w3ColorObject.toName() === '') {
				nameElement.innerHTML = 'Без названия';
			} else {
				nameElement.innerHTML = w3ColorObject.toName();
			}
			hexElement.innerHTML = w3ColorObject.toHexString();
			cmykElement.innerHTML = w3ColorObject.toCmykString();
			if (
				color.includes('rgba') ||
				color.includes('hsla') ||
				color.includes('hwba') ||
				color.includes('ncola') ||
				(color.indexOf('cmyk') === -1 && color.split(',').length === 4) ||
				(color.includes('cmyk') && color.split(',').length === 5)
			) {
				rgbElement.innerHTML = w3ColorObject.toRgbaString();
				hslElement.innerHTML = w3ColorObject.toHslaString();
				hwbElement.innerHTML = w3ColorObject.toHwbaString();
				ncolElement.innerHTML = w3ColorObject.toNcolaString();
			} else {
				rgbElement.innerHTML = w3ColorObject.toRgbString();
				hslElement.innerHTML = w3ColorObject.toHslString();
				hwbElement.innerHTML = w3ColorObject.toHwbString();
				ncolElement.innerHTML = w3ColorObject.toNcolString();
			}
		} else {
			validateColor();
		}
	} else {
		validateColor();
	}
}

function validateColor() {
	const colorInput = inputElement.value;
	const cleanedColor = colorInput.replace(/;/g, ',');
	const w3ColorObject = w3color(cleanedColor);
	if (colorInput !== '' && w3ColorObject.valid) {
		tableElement.style.display = 'table';
		convertColor();
	} else {
		resultElement.style.backgroundColor = '#fff';
		tableElement.style.display = 'none';
		hexElement.innerHTML = '';
		rgbElement.innerHTML = '';
		hslElement.innerHTML = '';
		hwbElement.innerHTML = '';
		ncolElement.innerHTML = '';
	}
}

function submitOnEnter(e) {
	const keyboardKey = e.which || e.keyCode;
	if (keyboardKey === 13) {
		validateColor();
	}
}
convertColor();
