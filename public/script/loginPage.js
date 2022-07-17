const xhrRequest = (method, url, callback, body = '') => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => callback(xhr);
  xhr.open(method, url);
  xhr.send(body);
};

const redirectToTicTacToe = (xhr) =>
  window.location.assign('/ticTacToe');

const displayWrongCredential = viewElement => () =>
  viewElement.innerText = 'Invalid username or password';

const loginRequest = () => {
  const form = document.querySelector('form');
  const formData = new FormData(form);
    const body = new URLSearchParams(formData);

  const messageElement = document.querySelector('.errMsg');
  xhrRequest(
    'POST',
    '/login',
    redirectToTicTacToe,
    body,
    displayWrongCredential(messageElement)
  );
  form.reset();
};

const main = () => {
  const loginBtn = document.querySelector('.login-button');
  // loginBtn.onclick = loginRequest;
};

window.onload = main;
