import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const textAreaEl = document.querySelector('.feedback-form textarea');
const inputEl = document.querySelector('.feedback-form input');

const newObj = { email: '', message: '' };

formEl.addEventListener('submit', onFormSubmit);
textAreaEl.addEventListener('input', throttle(onTextAreaInput, 500));
inputEl.addEventListener('input', throttle(onInputValue, 500));
// formEl.addEventListener("input", throttle(onAllInputArea, 500));

const formData = {};
savedTextarea();
savedInputValue();

function onFormSubmit(e) {
  e.preventDefault();

  const formElement = e.currentTarget.elements;

  const yourEmail = formElement.email.value;
  const yourComment = formElement.message.value;

  if (yourEmail && yourComment) {
    localStorage.removeItem('feedback-form-state');
    e.currentTarget.reset();
    console.log(formData);
  } else {
    alert('всі поля мають бути заповнені');
  }
}

function onInputValue(e) {
  newObj.email = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(newObj));
}

function onTextAreaInput(e) {
  newObj.message = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(newObj));
}

function savedTextarea() {
  const savedMessage = JSON.parse(localStorage.getItem('feedback-form-state'));

  if (savedMessage) {
    formData.message = savedMessage.message;
    textAreaEl.value = savedMessage.message || '';
  }
}

function savedInputValue() {
  const savedInput = JSON.parse(localStorage.getItem('feedback-form-state'));

  if (savedInput) {
    formData.email = savedInput.email;
    inputEl.value = savedInput.email || '';
  }
}

formEl.addEventListener('input', e => {
  formData[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  // console.log(formData);
});
