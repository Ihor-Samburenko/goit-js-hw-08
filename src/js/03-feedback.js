import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const textAreaEl = document.querySelector('.feedback-form textarea');
const inputEl = document.querySelector('.feedback-form input');

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(savedValue, 500));
// textAreaEl.addEventListener('input', throttle(onTextAreaInput, 500));
// inputEl.addEventListener('input', throttle(onInputValue, 500));

// const newObj = { email: '', message: '' };
const formData = {};
savedText();
// savedInputValue();

function savedValue(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  // console.log(formData);
}

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

function savedText() {
  const savedMessage = JSON.parse(localStorage.getItem('feedback-form-state'));

  if (savedMessage) {
    formData.email = savedMessage.email || '';
    formData.message = savedMessage.message || '';

    textAreaEl.value = savedMessage.message || '';
    inputEl.value = savedMessage.email || '';
  }
}

// function savedInputValue() {
//   const savedInput = JSON.parse(localStorage.getItem('feedback-form-state'));

//   if (savedInput) {
//     formData.email = savedInput.email;
//     inputEl.value = savedInput.email || '';
//   }
// }

// function onInputValue(e) {
//   newObj.email = e.target.value;
//   localStorage.setItem('feedback-form-state', JSON.stringify(newObj));
// }

// function onTextAreaInput(e) {
//   newObj.message = e.target.value;
//   localStorage.setItem('feedback-form-state', JSON.stringify(newObj));
// }
