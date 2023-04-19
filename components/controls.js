// controls.js
let idCounter = 0;

function createUniqueId() {
  idCounter++;
  return 'control_' + idCounter;
}

function createButton(text, clickCallback) {
  let button = document.createElement('button');
  button.textContent = text;
  button.addEventListener('click', clickCallback);
  return button;
}

function createLabel(text) {
  let label = document.createElement('label');
  label.textContent = text;
  return label;
}

function createTextbox(defaultValue) {
  let textbox = document.createElement('input');
  textbox.type = 'text';
  textbox.value = defaultValue || '';
  return textbox;
}

export { createButton, createLabel, createTextbox };