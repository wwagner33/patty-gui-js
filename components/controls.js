class Controls {
  static idCounter = 0;

  static createUniqueId() {
    this.idCounter++;
    return 'control_' + this.idCounter;
  }

  static createButton(text, clickCallback) {
    let button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', clickCallback);
    return button;
  }

  static createLabel(text) {
    let label = document.createElement('label');
    label.textContent = text;
    return label;
  }

  static createTextbox(defaultValue) {
    let textbox = document.createElement('input');
    textbox.type = 'text';
    textbox.value = defaultValue || '';
    return textbox;
  }
}

export { Controls };
