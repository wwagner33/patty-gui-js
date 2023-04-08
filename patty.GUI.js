// Define Patty.GUI namespace
var Patty = Patty || {};
Patty.GUI = Patty.GUI || {};

// Define controls module
Patty.GUI.controls = (function() {
  // Private variables
  var _idCounter = 0;

  // Private methods
  function _createUniqueId() {
    _idCounter++;
    return 'control_' + _idCounter;
  }

  // Public methods
  function createButton(text, clickCallback) {
    var button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', clickCallback);
    return button;
  }

  function createLabel(text) {
    var label = document.createElement('label');
    label.textContent = text;
    return label;
  }

  function createTextbox(defaultValue) {
    var textbox = document.createElement('input');
    textbox.type = 'text';
    textbox.value = defaultValue || '';
    return textbox;
  }

  // Expose public methods
  return {
    createButton: createButton,
    createLabel: createLabel,
    createTextbox: createTextbox
  };
})();

// Define dialogs module
Patty.GUI.dialogs = (function() {
  // Private variables
  var _dialogContainer = null;
  var _idCounter = 0;

  // Private methods
  function _createUniqueId() {
    _idCounter++;
    return 'dialog_' + _idCounter;
  }

  function _createDialogBox(title, content, buttons) {
    // Create dialog box container
    var dialogBox = document.createElement('div');
    dialogBox.className = 'dialog-box';
    dialogBox.id = _createUniqueId();

    // Create title
    var titleElement = document.createElement('div');
    titleElement.className = 'dialog-title';
    titleElement.textContent = title;
    dialogBox.appendChild(titleElement);

    // Create content
    var contentElement = document.createElement('div');
    contentElement.className = 'dialog-content';
    contentElement.appendChild(content);
    dialogBox.appendChild(contentElement);

    // Create buttons
    if (buttons) {
      var buttonContainer = document.createElement('div');
      buttonContainer.className = 'dialog-buttons';
      buttons.forEach(function(button) {
        buttonContainer.appendChild(button);
      });
      dialogBox.appendChild(buttonContainer);
    }

    return dialogBox;
  }

  // Public methods
  function showDialog(title, content, buttons) {
    // Create dialog box
    var dialogBox = _createDialogBox(title, content, buttons);

    // Add dialog box to container
    if (!_dialogContainer) {
      _dialogContainer = document.createElement('div');
      _dialogContainer.className = 'dialog-container';
      document.body.appendChild(_dialogContainer);
    }
    _dialogContainer.appendChild(dialogBox);

    // Disable scrolling on body
    document.body.style.overflow = 'hidden';
  }

  function hideDialog(dialogBox) {
    // Remove dialog box from container
    _dialogContainer.removeChild(dialogBox);

    // Enable scrolling on body if no dialogs are open
    if (_dialogContainer.children.length === 0) {
      document.body.style.overflow = '';
    }
  }

  // Expose public methods
  return {
    showDialog: showDialog,
    hideDialog: hideDialog
  };
})();
