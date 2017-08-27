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
  const email = emailInput.value;
  const appName = appNameInput.value;

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
      displayMsg.innerText = JSON.stringify(data);
      resetForm();
    })
    .catch(error => console.log(error));
}

function resetForm() {
  emailInput.value = '';
  appNameInput.value = '';
  submit.disabled = true;
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
