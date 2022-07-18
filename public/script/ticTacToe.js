const xhrRequest = (method, url, callback, body = '') => {
	const xhr = new XMLHttpRequest();
	xhr.onload = () => callback(xhr);
	xhr.open(method, url);
	xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
	xhr.send(body);
};

const logResponse = xhr =>
	console.log(xhr.response);

const sendMove = (event) => {
	const move = event.target.id;
	console.log(move);
	xhrRequest(
		'POST',
		'/tic-tac-toe',
		logResponse,
		`move=${move}`
	);
};

const main = () => {
	console.log('Page loaded!');
	document.querySelector('.grid').onclick = (event) => sendMove(event);
};

window.onload = main;
