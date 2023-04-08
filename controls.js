// Base class for all controls
class Control {
  constructor(id, parent) {
    this.id = id;
    this.parent = parent;
    this.element = null;
    this.value = null;
  }

  setValue(value) {
    this.value = value;
    if (this.element) {
      this.element.value = value;
    }
  }

  render() {
    this.element = document.createElement('div');
    this.element.id = this.id;
    this.element.classList.add('control');
    this.parent.appendChild(this.element);
  }
}

// Page class that represents a HTML page
class Page {
  constructor(title) {
    this.title = title;
    this.controls = [];
  }

  addControl(control) {
    this.controls.push(control);
  }

  render() {
    document.title = this.title;
    const body = document.getElementsByTagName('body')[0];
    const header = document.createElement('h1');
    header.innerHTML = this.title;
    body.appendChild(header);
    const container = document.createElement('div');
    container.id = 'container';
    body.appendChild(container);
    this.controls.forEach((control) => {
      control.render(container);
    });
  }
}

// Textbox control
class Textbox extends Control {
  constructor(id, parent, label) {
    super(id, parent);
    this.label = label;
  }

  render() {
    super.render();
    const label = document.createElement('label');
    label.innerHTML = this.label;
    this.element.appendChild(label);
    const textbox = document.createElement('input');
    textbox.type = 'text';
    textbox.value = this.value;
    this.element.appendChild(textbox);
    textbox.addEventListener('input', (event) => {
      this.value = event.target.value;
    });
  }
}

// Button control
class Button extends Control {
  constructor(id, parent, label) {
    super(id, parent);
    this.label = label;
  }

  render() {
    super.render();
    const button = document.createElement('button');
    button.innerHTML = this.label;
    this.element.appendChild(button);
  }

  onClick(callback) {
    const button = this.element.querySelector('button');
    button.addEventListener('click', () => {
      callback();
    });
  }
}

// Listbox control
class Listbox extends Control {
  constructor(id, parent, label, options) {
    super(id, parent);
    this.label = label;
    this.options = options;
  }

  render() {
    super.render();
    const label = document.createElement('label');
    label.innerHTML = this.label;
    this.element.appendChild(label);
    const listbox = document.createElement('select');
    this.options.forEach((option) => {
      const item = document.createElement('option');
      item.value = option.value;
      item.innerHTML = option.text;
      listbox.appendChild(item);
    });
    this.element.appendChild(listbox);
    listbox.addEventListener('change', (event) => {
      this.value = event.target.value;
    });
  }
}

// Datepicker Control
class Datepicker extends Control {
  constructor(id, parent) {
    super(id, parent);
    this.value = new Date();
  }

  setValue(value) {
    if (value instanceof Date && !isNaN(value.getTime())) {
      this.value = value;
      if (this.element) {
        this.element.valueAsDate = value;
      }
    }
  }

  render() {
    super.render();
    const label = document.createElement('label');
    label.innerHTML = "Date:";
    this.element.appendChild(label);
    const datepicker = document.createElement('input');
    datepicker.type = 'date';
    datepicker.valueAsDate = this.value;
    this.element.appendChild(datepicker);
    datepicker.addEventListener('input', (event) => {
      this.setValue(new Date(event.target.value));
    });
  }
}

// Checkbox Control
class Checkbox extends Control {
  constructor(id, parent, label) {
    super(id, parent);
    this.label = label;
  }

  setValue(value) {
    this.value = !!value;
    if (this.element) {
      this.element.checked = this.value;
    }
  }

  render() {
    super.render();
    const label = document.createElement('label');
    label.innerHTML = this.label;
    this.element.appendChild(label);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = this.value;
    this.element.appendChild(checkbox);
    checkbox.addEventListener('change', (event) => {
      this.setValue(event.target.checked);
    });
  }
}

// Radio Button Control
class RadioButton extends Control {
  constructor(id, parent, label, value) {
    super(id, parent);
    this.label = label;
    this.value = value;
  }

  setValue(value) {
    this.value = value;
    if (this.element) {
      this.element.checked = this.value === this.element.value;
    }
  }

  render() {
    super.render();
    const label = document.createElement('label');
    label.innerHTML = this.label;
    this.element.appendChild(label);
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.value = this.value;
    radio.name = this.id;
    radio.checked = this.value === this.element?.value;
    this.element.appendChild(radio);
    radio.addEventListener('change', (event) => {
      this.setValue(event.target.value);
    });
  }
}

// Textarea Control
class Textarea extends Control {
  constructor(id, parent, label) {
    super(id, parent);
    this.label = label;
  }

  setValue(value) {
    this.value = value;
    if (this.element) {
      this.element.value = value;
    }
  }

  render() {
    super.render();
    const label = document.createElement('label');
    label.innerHTML = this.label;
    this.element.appendChild(label);
    const textarea = document.createElement('textarea');
    textarea.value = this.value;
    this.element.appendChild(textarea);
    textarea.addEventListener('input', (event) => {
      this.setValue(event.target.value);
    });
  }
}





// ComboBox Control
class ComboBox extends Control {
  constructor(id, parent) {
    super(id, parent);
    this.options = [];
    this.selectedIndex = -1;
  }

  addOption(optionText) {
    this.options.push(optionText);
    if (this.element) {
      const option = document.createElement('option');
      option.text = optionText;
      this.element.add(option);
    }
  }

  removeOption(optionText) {
    const index = this.options.indexOf(optionText);
    if (index > -1) {
      this.options.splice(index, 1);
      if (this.element) {
        this.element.remove(index);
      }
      if (index <= this.selectedIndex) {
        this.selectedIndex--;
        this.setValue(this.selectedIndex >= 0 ? this.options[this.selectedIndex] : null);
      }
    }
  }

  render() {
    super.render();
    const select = document.createElement('select');
    select.id = this.id;
    this.options.forEach((optionText) => {
      const option = document.createElement('option');
      option.text = optionText;
      select.add(option);
    });
    this.element.appendChild(select);
    select.addEventListener('change', (event) => {
      this.selectedIndex = event.target.selectedIndex;
      this.setValue(this.selectedIndex >= 0 ? this.options[this.selectedIndex] : null);
    });
  }
}

// Datepicker Control
class Datepicker extends Control {
  constructor(id, parent) {
    super(id, parent);
    this.value = new Date();
  }

  setValue(value) {
    if (value instanceof Date && !isNaN(value.getTime())) {
      this.value = value;
      if (this.element) {
        this.element.valueAsDate = value;
      }
    }
  }

  render() {
    super.render();
    const label = document.createElement('label');
    label.innerHTML = "Date:";
    this.element.appendChild(label);
    const datepicker = document.createElement('input');
    datepicker.type = 'date';
    datepicker.valueAsDate = this.value;
    this.element.appendChild(datepicker);
    datepicker.addEventListener('input', (event) => {
      this.setValue(new Date(event.target.value));
    });
  }
}

// Checkbox Control
class Checkbox extends Control {
  constructor(id, parent, label) {
    super(id, parent);
    this.label = label;
  }

  setValue(value) {
    this.value = !!value;
    if (this.element) {
      this.element.checked = this.value;
    }
  }

  render() {
    super.render();
    const label = document.createElement('label');
    label.innerHTML = this.label;
    this.element.appendChild(label);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = this.value;
    this.element.appendChild(checkbox);
    checkbox.addEventListener('change', (event) => {
      this.setValue(event.target.checked);
    });
  }
}

// Radio Button Control
class RadioButton extends Control {
  constructor(id, parent, label, value) {
    super(id, parent);
    this.label = label;
    this.value = value;
  }

  setValue(value) {
    this.value = value;
    if (this.element) {
      this.element.checked = this.value === this.element.value;
    }
  }

  render() {
    super.render();
    const label = document.createElement('label');
    label.innerHTML = this.label;
    this.element.appendChild(label);
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.value = this.value;
    radio.name = this.id;
    radio.checked = this.value === this.element?.value;
    this.element.appendChild(radio);
    radio.addEventListener('change', (event) => {
      this.setValue(event.target.value);
    });
  }
}

// Textarea Control
class Textarea extends Control {
  constructor(id, parent, label) {
    super(id, parent);
    this.label = label;
  }

  setValue(value) {
    this.value = value;
    if (this.element) {
      this.element.value = value;
    }
  }

  render() {
    super.render();
    const label = document.createElement('label');
    label.innerHTML = this.label;
    this.element.appendChild(label);
    const textarea = document.createElement('textarea');
    textarea.value = this.value;
    this.element.appendChild(textarea);
    textarea.addEventListener('input', (event) => {
      this.setValue(event.target.value);
    });
  }
}

// ComboBox Control
class ComboBox extends Control {
  constructor(id, parent) {
    super(id, parent);
    this.options = [];
    this.selectedIndex = -1;
  }

  addOption(optionText) {
    this.options.push(optionText);
    if (this.element) {
      const option = document.createElement('option');
      option.text = optionText;
      this.element.add(option);
    }
  }

  removeOption(optionText) {
    const index = this.options.indexOf(optionText);
    if (index > -1) {
      this.options.splice(index, 1);
      if (this.element) {
        this.element.remove(index);
      }
      if (index <= this.selectedIndex) {
        this.selectedIndex--;
        this.setValue(this.selectedIndex >= 0 ? this.options[this.selectedIndex] : null);
      }
    }
  }

  render() {
    super.render();
    const select = document.createElement('select');
    select.id = this.id;
    this.options.forEach((optionText) => {
      const option = document.createElement('option');
      option.text = optionText;
      select.add(option);
    });
    this.element.appendChild(select);
    select.addEventListener('change', (event) => {
      this.selectedIndex = event.target.selectedIndex;
      this.setValue(this.selectedIndex >= 0 ? this.options[this.selectedIndex] : null);
    });
  }
}


export { Control, Page, Textbox, Button, Listbox, Datepicker, Checkbox, RadioButton, Textarea };
