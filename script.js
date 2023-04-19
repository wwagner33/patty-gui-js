// Button Example
let button = Patty.GUI.controls.createButton('Click me!', function() {
    alert('Button clicked!');
  });
  document.body.appendChild(button);
  
  // Label Example
  let label = Patty.GUI.controls.createLabel('Enter your name:');
  document.body.appendChild(label);
  
  // Textbox Example
  let textbox = Patty.GUI.controls.createTextbox('John Doe');
  document.body.appendChild(textbox);
  
  // Dialog Example
  let dialogTitle = 'Bem-vindo ao meu teste de uma Dialog';
  let dialogContent = document.createElement('p');
  dialogContent.textContent = 'Este é o teste da minha Dialog Box. ';
  let dialogButton = Patty.GUI.controls.createButton('Close', function() {
    Patty.GUI.dialogs.hideDialog(dialogBox);
  });
  let dialogBox = Patty.GUI.dialogs.showDialog(dialogTitle, dialogContent, [dialogButton]);