Patty.GUI.DialogBox = function(title, content, buttons) {
  // Create the dialog box element
  var dialogBox = document.createElement('div');
  dialogBox.className = 'dialog-box';

  // Create the title element
  var titleElem = document.createElement('h2');
  titleElem.innerHTML = title;
  dialogBox.appendChild(titleElem);

  // Create the content element
  var contentElem = document.createElement('div');
  contentElem.innerHTML = content;
  dialogBox.appendChild(contentElem);

  // Create the buttons element
  var buttonsElem = document.createElement('div');
  buttonsElem.className = 'dialog-box-buttons';

  // Add buttons to the buttons element
  buttons.forEach(function(button) {
    var buttonElem = document.createElement('button');
    buttonElem.innerHTML = button.label;
    buttonElem.addEventListener('click', function() {
      button.callback(dialogBox);
    });
    buttonsElem.appendChild(buttonElem);
  });

  dialogBox.appendChild(buttonsElem);

  // Add methods to the dialog box element
  dialogBox.show = function() {
    dialogBox.style.display = 'block';
  };

  dialogBox.hide = function() {
    dialogBox.style.display = 'none';
  };

  return dialogBox;
};

