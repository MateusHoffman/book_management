# **Book Management**

Este projeto tem como objetivo gerenciar um sistema de usuários e livros. Ele possui funcionalidades de autenticação, onde usuários podem se cadastrar e logar, e um painel administrativo onde administradores podem gerenciar os usuários e livros. O sistema é desenvolvido utilizando React para o frontend e uma API fictícia para realizar as operações CRUD (Criar, Ler, Atualizar, Deletar) para livros e usuários.

## **Índice**

1. [Sobre o Projeto](#sobre-o-projeto)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Pré-requisitos](#pré-requisitos)
4. [Instalação e Execução](#instalação-e-execução)
   - [Rodando o Backend (API)](#rodando-o-backend-api)
   - [Rodando o Frontend (React)](#rodando-o-frontend-react)
5. [Testes Unitários](#testes-unitários)
6. [Estrutura de Diretórios](#estrutura-de-diretórios)
7. [Contribuindo](#contribuindo)
8. [Licença](#licença)

## **Sobre o Projeto**

Este é um projeto desenvolvido com **React** no frontend e um backend simulado usando **json-server**. O sistema possui funcionalidades para cadastro, login e gerenciamento de livros e usuários. O backend simula uma API RESTful para manipulação de dados.

## **Tecnologias Utilizadas**

- **Frontend:**
  - React (com hooks)
  - React Router
  - Tailwind CSS
  - Fetch API

- **Backend:**
  - json-server (para simulação de API RESTful)

- **Testes:**
  - Jest
  - React Testing Library

## **Pré-requisitos**

Antes de rodar o projeto, é necessário ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/) (gerenciadores de pacotes)
- [json-server](https://github.com/typicode/json-server) para rodar o backend simulado

### **Instalação do Node.js**

- Caso você ainda não tenha o Node.js instalado, faça o download [aqui](https://nodejs.org/).
  
### **Instalação do Yarn (caso necessário)**

- Se você optar por usar o Yarn, pode instalar com o seguinte comando:

  ```bash
  npm install --global yarn
  ```

## **Instalação e Execução**

### **Passos para rodar o projeto:**

1. **Clone o repositório:**

   Primeiramente, clone o repositório em sua máquina local:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```

2. **Acesse a pasta do projeto:**

   Navegue até a pasta do projeto clonada:

   ```bash
   cd seu-repositorio
   ```

3. **Instale as dependências:**

   Instale as dependências do projeto utilizando o gerenciador de pacotes:

   Se você estiver utilizando o **Yarn**:

   ```bash
   yarn install
   ```

   Ou, se estiver usando **npm**:

   ```bash
   npm install
   ```

### **Rodando o Backend (API):**

O projeto utiliza **json-server** para simular uma API RESTful com dados persistidos em um arquivo JSON.

1. **Configuração do arquivo de dados:**

   Certifique-se de que o arquivo `db.json` esteja presente na raiz do projeto. Este arquivo contém os dados simulados.

2. **Rodando o json-server:**

   Para iniciar o servidor backend, execute o comando abaixo. Ele irá rodar a API no endereço `http://localhost:5000`.

   Se você estiver usando **Yarn**:

   ```bash
   yarn json-server --watch db.json --port 5000
   ```

   Ou, se estiver usando **npm**:

   ```bash
   npx json-server --watch db.json --port 5000
   ```

### **Rodando o Frontend (React):**

1. Inicie o servidor de desenvolvimento do React:

   Se você estiver usando **Yarn**:

   ```bash
   yarn start
   ```

   Ou, se estiver usando **npm**:

   ```bash
   npm start
   ```

2. Acesse o aplicativo em seu navegador através do endereço [http://localhost:3000](http://localhost:3000).

### **Rodando os Testes Unitários:**

Este projeto inclui testes unitários para garantir a funcionalidade do código.

1. **Testes com Jest e React Testing Library:**

   Para rodar os testes, use o seguinte comando:

   Se estiver utilizando **Yarn**:

   ```bash
   yarn test
   ```

   Ou, se estiver utilizando **npm**:

   ```bash
   npm test
   ```

   O comando irá executar todos os testes definidos e, se houver mudanças no código, os testes serão automaticamente reexecutados. Para uma execução única dos testes, você pode usar a opção `--coverage`:

   Se estiver usando **Yarn**:

   ```bash
   yarn test --coverage
   ```

   Ou, com **npm**:

   ```bash
   npm test --coverage
   ```

   Isso gerará um relatório de cobertura de testes, mostrando quais partes do código foram testadas.

2. **Verificando Testes Específicos:**

   Caso você queira rodar apenas testes específicos, você pode passar o nome do teste. Por exemplo:

   Se estiver usando **Yarn**:

   ```bash
   yarn test NomeDoTeste
   ```

   Ou com **npm**:

   ```bash
   npm test NomeDoTeste
   ```

### **Rodando o Backend e Frontend Juntos (Opcional):**

Para rodar o backend e o frontend simultaneamente, você pode configurar um ambiente de desenvolvimento com `concurrently`.

1. Instale a dependência `concurrently`:

   ```bash
   yarn add concurrently --dev
   ```

   Ou, com **npm**:

   ```bash
   npm install concurrently --save-dev
   ```

2. Configure um script no `package.json` para rodar os dois servidores juntos:

   ```json
   "scripts": {
     "dev": "concurrently \"yarn json-server --watch db.json --port 5000\" \"yarn start\""
   }
   ```

3. Para rodar os dois servidores, basta executar o comando:

   ```bash
   yarn dev
   ```

   Ou com **npm**:

   ```bash
   npm run dev
   ```

### **Estrutura de Diretórios**

Aqui está a estrutura básica do projeto:

```
/seu-repositorio
│
├── /public                 # Arquivos públicos (index.html, etc.)
├── /src                    # Código fonte
│   ├── /components         # Componentes React
│   ├── /api                # Funções para interação com a API
│   ├── /tests              # Arquivos de teste
│   ├── /types              # Tipos TypeScript
│   └── App.tsx             # Componente principal
├── /db.json                # Arquivo de dados do json-server
├── package.json             # Dependências e scripts do projeto
└── README.md               # Este arquivo
```

## **Contribuindo**

1. Faça um **fork** do repositório.
2. Crie uma branch para a sua feature (`git checkout -b feature/MinhaNovaFeature`).
3. Faça as alterações desejadas e **commit** as alterações (`git commit -m 'Adiciona nova feature'`).
4. **Push** para a sua branch (`git push origin feature/MinhaNovaFeature`).
5. Abra um **pull request**.

## **Licença**

Este projeto é licenciado sob a licença MIT - consulte o arquivo [LICENSE](LICENSE) para mais informações.

---

Com essas instruções, o README está agora detalhado e completo, cobrindo desde a instalação até os testes unitários.
