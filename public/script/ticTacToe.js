const xhrRequest = (request, callback, body = '') => {
	const xhr = new XMLHttpRequest();
	xhr.onload = () => callback(xhr);

	xhr.open(request.method, request.url);
	const contentType = request['content-type'] || 'text/plain';
	xhr.setRequestHeader('content-type', contentType);

	xhr.send(body);
};

const logResponse = xhr =>
	console.log(xhr.response);

const sendMove = (event) => {
	const move = event.target.id;
	console.log(move);
	const request = {
		method: 'POST',
		url: '/tic-tac-toe',
		'content-type': 'application/x-www-form-urlencoded'
	};
	xhrRequest(
		request,
		logResponse,
		`move=${move}`
	);
};

const main = () => {
	console.log('Page loaded!');
	document.querySelector('.grid').onclick = (event) => sendMove(event);
};

window.onload = main;
