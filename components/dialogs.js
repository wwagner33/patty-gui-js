// dialogs.js
class Dialogs {
  static dialogContainer = null;
  static idCounter = 0;

  static createUniqueId() {
    this.idCounter++;
    return 'dialog_' + this.idCounter;
  }

  static createDialogBox(title, content, buttons) {
    let dialogBox = document.createElement('div');
    dialogBox.className = 'dialog-box';
    dialogBox.id = this.createUniqueId();

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

  static showDialog(title, content, buttons) {
    let dialogBox = this.createDialogBox(title, content, buttons);

    if (!this.dialogContainer) {
      this.dialogContainer = document.createElement('div');
      this.dialogContainer.className = 'dialog-container';
      document.body.appendChild(this.dialogContainer);
    }
    this.dialogContainer.appendChild(dialogBox);

    document.body.style.overflow = 'hidden';
  }

  static hideDialog(dialogBox) {
    this.dialogContainer.removeChild(dialogBox);

    if (this.dialogContainer.children.length === 0) {
      document.body.style.overflow = '';
    }
  }
}

export { Dialogs };
