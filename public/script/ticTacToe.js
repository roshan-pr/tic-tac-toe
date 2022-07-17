const logEvent = (event) => {
	console.log(event.target);
};

const main = () => {
	console.log('Page loaded!');

	document.querySelector('.grid').onclick = (event) => logEvent(event);
};

window.onload = main;
