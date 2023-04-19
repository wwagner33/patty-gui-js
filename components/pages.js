import { showDialog, hideDialog } from './dialogs.js';
import { createButton, createLabel, createTextbox } from './controls.js';

class Page {
  constructor() {
    this.dialogContainer = null;
    this.controls = [];
  }

  createDialog(title, content, buttons) {
    let dialogBox = document.createElement('div');
    dialogBox.className = 'dialog-box';

    let titleElement = document.createElement('div');
    titleElement.className = 'dialog-title';
    titleElement.textContent = title;
    dialogBox.appendChild(titleElement);

    let contentElement = document.createElement('div');
    contentElement.className = 'dialog-content';
    contentElement.appendChild(content);
    dialogBox.appendChild(contentElement);

    if (buttons) {
      let buttonContainer = document.createElement('div');
      buttonContainer.className = 'dialog-buttons';
      buttons.forEach(function(button) {
        buttonContainer.appendChild(button);
      });
      dialogBox.appendChild(buttonContainer);
    }

    if (!this.dialogContainer) {
      this.dialogContainer = document.createElement('div');
      this.dialogContainer.className = 'dialog-container';
      document.body.appendChild(this.dialogContainer);
    }
    this.dialogContainer.appendChild(dialogBox);

    document.body.style.overflow = 'hidden';
  }

  createButton(text, clickCallback) {
    let button = createButton(text, clickCallback);
    this.controls.push(button);
    return button;
  }

  createLabel(text) {
    let label = createLabel(text);
    this.controls.push(label);
    return label;
  }

  createTextbox(defaultValue) {
    let textbox = createTextbox(defaultValue);
    this.controls.push(textbox);
    return textbox;
  }

  show() {
    this.controls.forEach(function(control) {
      document.body.appendChild(control);
    });
  }

  hide() {
    this.controls.forEach(function(control) {
      document.body.removeChild(control);
    });
  }

  showDialog(title, content, buttons) {
    showDialog(title, content, buttons);
  }

  hideDialog(dialogBox) {
    hideDialog(dialogBox);
  }
}

export default Page;
