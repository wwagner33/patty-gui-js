/**
 * Biblioteca patty-gui.js
 * 
 * @author Wellington W. F. Sarmento
 * @author Patrícia S. Paula
 * @license GPL-v3
 * 
 * Data de Criação: 11/02/2024
 * Data de Atualização: 11/02/2024
 * 
 * 
 * @file patty-gui.js
 * 
 * * @description Biblioteca Javascript Vanilla para fins de ensino e aprendizado de construção de componentes GUI. 
 * @version 0.9.0
 **/


/**
 *
 *
 * @class TreeNode
 */
class TreeNode {
    constructor(component, id) {
        this.id = id || Math.random().toString(36).substr(2, 9); // Gera um ID aleatório se não fornecido
        this.component = component;
        this.children = []; // Filhos do nó
        this.parent = null; // Nó pai
        this.position = { row: 0, column: 0 }; // Posição do nó
    }

    addChild(node, position = { row: 0, column: 0 }) {
        node.parent = this; // Define este nó como pai
        node.position = position; // Define a posição do nó filho
        this.children.push(node); // Adiciona o nó filho à lista de filhos
    }
}

/**
 *
 *
 * @class App
 */
class App {
    constructor(options) {
        this.root = new TreeNode({ render: () => document.createElement('div') }, 'root'); // Nó raiz
        this.nodesById = { 'root': this.root }; // Armazena nós por ID
        this.container = document.getElementById('patty-gui');
        if (!this.container) {
            console.error('Erro: div patty-gui não encontrada. Certifique-se de que uma div com id "patty-gui" esteja presente no HTML.');
            return;
        }
        this.container.style.display = 'flex';
        this.container.style.flexDirection = 'column';
        this.container.style.alignItems = 'center';
        if (options && options.fontFamily) {
            this.setFont(options.fontFamily); // Define a fonte, se fornecida
        } else {
            this.setFont('Roboto, sans-serif'); // Define a fonte padrão, se não fornecida
        }

    }

    addComponent(component, parentId = 'root', position) {
        if (!(component instanceof Component)) {
            console.error('Erro: Componente inválido. O componente deve ser uma instância de uma subclasse de Component.');
            return;
        }
        const parentNode = this.nodesById[parentId];
        if (!parentNode) {
            console.error(`Erro: Nó pai com ID ${parentId} não encontrado.`);
            return;
        }
        const newNode = new TreeNode(component);
        parentNode.addChild(newNode, position); // Adiciona o novo nó como filho do nó pai
        this.nodesById[newNode.id] = newNode; // Armazena o novo nó por ID
    }

    removeComponentById(componentId) {
        const node = this.nodesById[componentId];
        if (!node || !node.parent) {
            console.error(`Erro: Componente com ID ${componentId} não encontrado ou não possui pai.`);
            return;
        }
        node.parent.children = node.parent.children.filter(child => child.id !== componentId); // Remove o nó da lista de filhos do pai
        delete this.nodesById[componentId]; // Remove o nó do armazenamento por ID
    }

    renderNode(node, container) {
        const el = node.component.render(); // Renderiza o componente do nó
        container.appendChild(el); // Adiciona o elemento ao contêiner
        node.children.forEach(child => {
            this.renderNode(child, el); // Renderiza recursivamente os filhos do nó
        });
    }

    render() {
        this.container.innerHTML = ''; // Limpa o contêiner antes de renderizar
        this.renderNode(this.root, this.container); // Inicia a renderização a partir do nó raiz
    }

    setFont(fontFamily) {
        this.container.style.fontFamily = fontFamily; // Define a família de fontes do contêiner
    }
}

// Implementação das subclasses de Component: TextBox, Button, TextArea, DateInput, PasswordInput, RadioButton, Label

class Component {
    constructor(options) {
        this.options = options || {};
        this.eventHandlers = {}; // Armazena os manipuladores de eventos
    }

    // Adiciona ou modifica um manipulador de evento
    eventHandler(type, handler) {
        this.eventHandlers[type] = handler;
    }

    // Aplica os manipuladores de evento ao elemento DOM
    applyEventHandlers(element) {
        for (const [type, handler] of Object.entries(this.eventHandlers)) {
            element.addEventListener(type, handler);
        }
    }

    render() {
        throw new Error('Subclasses de Component devem implementar o método render');
    }
}

class TextBox extends Component {
    render() {
        const { placeholder = '', id } = this.options;
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = placeholder;
        input.id = id;
        this.applyEventHandlers(input); // Aplica os manipuladores de eventos
        return input;
    }
}

class Button extends Component {
    render() {
        const { text = 'Button', id } = this.options;
        const button = document.createElement('button');
        button.textContent = text;
        button.id = id;
        this.applyEventHandlers(button); // Aplica os manipuladores de eventos
        return button;
    }
}

/**
 *
 *
 * @class TextArea
 * @extends {Component}
 */
class TextArea extends Component {
    render() {
        const { placeholder = '', id } = this.options; // Extrai placeholder e id das opções
        const textarea = document.createElement('textarea'); // Cria um elemento de área de texto
        textarea.placeholder = placeholder; // Define o texto de placeholder
        textarea.id = id; // Define o id da área de texto
        this.applyEventHandlers(textarea);
        return textarea; // Retorna o elemento de área de texto
    }
}


/**
 *
 *
 * @class DateInput
 * @extends {Component}
 */
class DateInput extends Component {
    render() {
        const { id } = this.options; // Extrai id das opções
        const input = document.createElement('input'); // Cria um elemento de entrada
        input.type = 'date'; // Define o tipo como data
        input.id = id; // Define o id do elemento
        this.applyEventHandlers(input);
        return input; // Retorna o elemento de entrada
    }
}

// Estende Component para PasswordInput
/**
 *
 *
 * @class PasswordInput
 * @extends {Component}
 */
class PasswordInput extends Component {
    render() {
        const { placeholder = '', id } = this.options; // Extrai placeholder e id das opções
        const input = document.createElement('input'); // Cria um elemento de entrada
        input.type = 'password'; // Define o tipo como senha
        input.placeholder = placeholder; // Define o texto de placeholder
        input.id = id; // Define o id do elemento
        this.applyEventHandlers(input);
        return input; // Retorna o elemento de entrada
    }
}

/**
 *
 *
 * @class RadioButton
 * @extends {Component}
 */
class RadioButton extends Component {
    render() {
        const { name, value, id, text } = this.options; // Extrai nome, valor, id e texto das opções

        const container = document.createElement('div'); // Cria um contêiner para o botão de rádio e a label
        container.className = 'radio-container'; // Aplica a classe CSS

        const input = document.createElement('input'); // Cria o elemento de entrada
        input.type = 'radio'; // Define o tipo como botão de rádio
        input.name = name; // Define o nome do grupo de botões de rádio
        input.value = value; // Define o valor do botão de rádio
        input.id = id; // Define o id do botão de rádio

        const label = document.createElement('label'); // Cria o elemento de etiqueta
        label.htmlFor = id; // Define a associação da etiqueta com o id do input
        label.textContent = text; // Define o texto da etiqueta

        container.appendChild(input); // Adiciona o botão de rádio ao contêiner
        container.appendChild(label); // Adiciona a label ao contêiner

        this.applyEventHandlers(input); // Aplica os manipuladores de eventos ao botão de rádio
        return container; // Retorna o contêiner contendo o botão de rádio e a label
    }
}


/**
 *
 *
 * @class CheckBox
 * @extends {Component}
 */
class CheckBox extends Component {
    render() {
        const { name, value, id, text } = this.options; // Extrai nome, valor, id e texto das opções

        const container = document.createElement('div'); // Cria um contêiner para o checkbox e a label
        container.className = 'checkbox-container'; // Aplica a classe CSS

        const input = document.createElement('input'); // Cria o elemento de entrada
        input.type = 'checkbox'; // Define o tipo como checkbox
        input.name = name; // Define o nome do checkbox
        input.value = value; // Define o valor do checkbox
        input.id = id; // Define o id do checkbox

        const label = document.createElement('label'); // Cria o elemento de etiqueta
        label.htmlFor = id; // Define a associação da etiqueta com o id do input
        label.textContent = text; // Define o texto da etiqueta

        container.appendChild(input); // Adiciona o checkbox ao contêiner
        container.appendChild(label); // Adiciona a label ao contêiner

        this.applyEventHandlers(input); // Aplica os manipuladores de eventos ao checkbox
        return container; // Retorna o contêiner contendo o checkbox e a label
    }
}




/**
 *
 *
 * @class Label
 * @extends {Component}
 */
class Label extends Component {
    render() {
        const { forId, text, id } = this.options; // Extrai forId, texto e id das opções
        const label = document.createElement('label'); // Cria um elemento de etiqueta
        label.htmlFor = forId; // Define a associação da etiqueta com o id do input
        label.textContent = text; // Define o texto da etiqueta
        label.id = id; // Define o id da etiqueta
        this.applyEventHandlers(label);
        return label; // Retorna o elemento de etiqueta
    }
}

class Title extends Component {
    render() {
        const { text, id, level = 2 } = this.options; // Extrai texto, id e nível do título das opções
        const headingLevel = Math.min(Math.max(level, 1), 6); // Garante que o nível esteja entre 1 e 6

        const title = document.createElement(`h${headingLevel}`); // Cria um elemento de título com o nível especificado
        title.textContent = text; // Define o texto do título
        title.id = id; // Define o id do título
        this.applyEventHandlers(title); // Aplica os manipuladores de eventos
        return title; // Retorna o elemento de título
    }
}
