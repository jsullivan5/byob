/* global document */
/* global fetch */


const submit = document.getElementById('form-submit');
const emailInput = document.getElementById('form-email');
const appNameInput = document.getElementById('form-app-name');

submit.addEventListener('click', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const displayMsg = document.getElementById('jwt-message');
  const email = document.getElementById('form-email').value;
  const appName = document.getElementById('form-app-name').value;

  console.log(email, appName);

  fetch('/api/v1/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      appName,
    })
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      displayMsg.innerText = JSON.stringify(data);
    })
    .catch(error => console.log(error));
}
