/* global document */
/* global fetch */
/* global alert */

const submit = document.getElementById('form-submit');
const emailInput = document.getElementById('form-email');
const appNameInput = document.getElementById('form-app-name');

submit.addEventListener('click', handleSubmit);
emailInput.addEventListener('change', disableBtn);
appNameInput.addEventListener('change', disableBtn);

function handleSubmit(event) {
  event.preventDefault();
  const displayMsg = document.getElementById('jwt-message');
  const email = document.getElementById('form-email').value;
  const appName = document.getElementById('form-app-name').value;

  if (!validateEmail(email)) {
    alert('Please include a valid email address.');
    return;
  }

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

function disableBtn() {
  if (emailInput !== '' && appNameInput !== '') {
    submit.disabled = false;
  } else {
    submit.disabled = true;
  }
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
