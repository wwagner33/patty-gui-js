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
 * * @description A biblioteca patty-gui é uma ferramenta simples e flexível para construção de interfaces gráficas de usuário (GUI) em páginas web. Permite a criação dinâmica de componentes de formulário como caixas de texto, botões, áreas de texto, entradas de data, senhas, botões de rádio e etiquetas, com gestão hierárquica de componentes para facilitar a organização e a manipulação da estrutura da interface. Esta biblioteca é ideal para desenvolvedores que buscam uma solução leve e sem dependências para adicionar interatividade às suas páginas web, seguindo os princípios de design moderno e boa usabilidade.
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

/**
 *
 *
 * @class Component
 */
class Component {
    constructor(options) {
        this.options = options || {}; // Opções fornecidas ou um objeto vazio como padrão
    }

    render() {
        throw new Error('Subclasses de Component devem implementar o método render');
    }
}

/**
 *
 *
 * @class TextBox
 * @extends {Component}
 */
class TextBox extends Component {
    render() {
        const { placeholder = '', id } = this.options; // Extrai placeholder e id das opções
        const input = document.createElement('input'); // Cria um elemento de entrada
        input.type = 'text'; // Define o tipo como texto
        input.placeholder = placeholder; // Define o texto de placeholder
        input.id = id; // Define o id do elemento
        return input; // Retorna o elemento de entrada
    }
}

/**
 *
 *
 * @class Button
 * @extends {Component}
 */
class Button extends Component {
    render() {
        const { text = 'Button', onClick, id } = this.options; // Extrai texto, onClick e id das opções
        const button = document.createElement('button'); // Cria um elemento de botão
        button.textContent = text; // Define o texto do botão
        button.id = id; // Define o id do botão
        if (onClick) {
            button.addEventListener('click', onClick); // Adiciona o ouvinte de evento de clique, se fornecido
        }
        return button; // Retorna o elemento de botão
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
        const { name, value, id } = this.options; // Extrai nome, valor e id das opções
        const input = document.createElement('input'); // Cria um elemento de entrada
        input.type = 'radio'; // Define o tipo como botão de rádio
        input.name = name; // Define o nome do grupo de botões de rádio
        input.value = value; // Define o valor do botão de rádio
        input.id = id; // Define o id do botão de rádio
        return input; // Retorna o elemento de botão de rádio
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
        return label; // Retorna o elemento de etiqueta
    }
}
