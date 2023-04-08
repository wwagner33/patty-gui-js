# Patty.GUI

Patty.GUI is a lightweight and easy-to-use JavaScript library for creating custom GUI components and dialogs for your web applications.

## Features

* Simple API for creating GUI components such as buttons, labels, textboxes, and dropdowns
* Customizable styles and themes
* Built-in support for keyboard shortcuts and accessibility
* Dialog box API for displaying modal and non-modal dialogs
* Fully documented API and code samples

## Getting Started

To get started with Patty.GUI, simply include the `patty.gui.js` file in your HTML page:

```html
<script src="path/to/patty.gui.js"></script>
```

Then, use the provided API to create your custom GUI components:

```javascript
const button = new Patty.GUI.Button("Click me!");
button.onClick(() => alert("Button clicked!"));
button.render(document.body);
```



You can also create dialog boxes:
```javascript
const dialog = new Patty.GUI.Dialog({
    title: "My Dialog",
    content: "This is the content of my dialog.",
    buttons: [
        {
            label: "OK",
            onClick: () => alert("OK clicked!")
        },
        {
            label: "Cancel",
            onClick: () => alert("Cancel clicked!")
        }
    ]
});
dialog.show();

```

API Documentation
For full API documentation, please see the API documentation.

Contributing
If you would like to contribute to Patty.GUI, please submit a pull request or open an issue. We welcome any contributions, including bug fixes, new features, and documentation improvements.

License
Patty.GUI is licensed under the GPL 3 License.
