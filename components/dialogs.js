// dialogs.js
let dialogContainer = null;
let idCounter = 0;

function createUniqueId() {
  idCounter++;
  return 'dialog_' + idCounter;
}

function createDialogBox(title, content, buttons) {
  let dialogBox = document.createElement('div');
  dialogBox.className = 'dialog-box';
  dialogBox.id = createUniqueId();

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
  return dialogBox;
}

function showDialog(title, content, buttons) {
  let dialogBox = createDialogBox(title, content, buttons);

  if (!dialogContainer) {
    dialogContainer = document.createElement('div');
    dialogContainer.className = 'dialog-container';
    document.body.appendChild(dialogContainer);
  }
  dialogContainer.appendChild(dialogBox);

  document.body.style.overflow = 'hidden';
}

function hideDialog(dialogBox) {
  dialogContainer.removeChild(dialogBox);

  if (dialogContainer.children.length === 0) {
    document.body.style.overflow = '';
  }
}

export { showDialog, hideDialog };