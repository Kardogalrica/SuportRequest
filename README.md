# SuportRequest

Aplicação web de demonstração para registar, consultar e acompanhar pedidos de suporte de IT. A interface permite preencher pedidos, validar os dados introduzidos e gerir o respetivo estado através de um dashboard.

> **Estado atual:** o projeto está implementado como frontend React. Os pedidos são guardados no `localStorage` do navegador; no código analisado não foi identificado um backend ou uma API para persistência partilhada. Por isso, os dados não são sincronizados entre utilizadores ou dispositivos.

## Funcionalidades

- **Dashboard de pedidos:** consulta dos pedidos registados numa tabela.
- **Pesquisa e filtros:** possibilidade de filtrar os pedidos por campos como departamento, prioridade e estado.
- **Criação e edição de pedidos:** formulário dedicado, acessível pela rota `/EditSuportRequest`.
- **Dados do requerente:** nome e email apresentados no formulário.
- **Validação dos campos:** validação de campos obrigatórios, data da ocorrência, descrição e anexos.
- **Prioridades:** Baixa, Média, Alta e Crítica.
- **Categorias, departamentos e prioridades:** opções definidas em módulos de dados no frontend.
- **Anexos:** o formulário contempla ficheiros PDF, PNG, JPG, JPEG, DOCX e XLSX, com limite de cinco ficheiros e 10 MB por ficheiro.
- **Estados do pedido:** o fluxo inclui estados como Rascunho, Submetido, Devolvido, Concluído e Cancelado.
- **Gestão de utilizadores (interface inicial):** existe uma página de dashboard de utilizadores, ainda sem um fluxo completo de gestão persistente.

## Tecnologias

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/) 8
- [React Router](https://reactrouter.com/) 7
- [Bootstrap](https://getbootstrap.com/) 5
- [React Bootstrap](https://react-bootstrap.github.io/)
- JavaScript com módulos ES
- ESLint

## Estrutura do projeto

```text
SuportRequest/
├── LICENSE
├── README.md
└── front/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        └── components/
            ├── F000-UserRequest/
            │   └── DashBoardUser.jsx
            ├── F001-SuportRequest/
            │   ├── Dashboard.jsx
            │   ├── SupportRequestForm.jsx
            │   ├── Action/
            │   └── Data/
            ├── Layouts/
            ├── Adaptive/
            ├── Content/
            ├── Patterns/
            ├── Widgets/
            └── infra/
```

### Componentes principais

- `src/App.jsx`: configura as rotas da aplicação.
- `src/components/F001-SuportRequest/Dashboard.jsx`: apresenta e filtra a lista de pedidos.
- `src/components/F001-SuportRequest/SupportRequestForm.jsx`: formulário de criação e edição de pedidos.
- `src/components/F001-SuportRequest/Action/`: funções de atualização e validação dos campos.
- `src/components/F001-SuportRequest/Data/`: modelos e opções de dados dos pedidos, categorias, departamentos e prioridades.
- `src/components/infra/localStorage.jsx`: acesso ao armazenamento local do navegador.
- `src/components/Layouts/`, `Adaptive/`, `Content/`, `Patterns/` e `Widgets/`: componentes reutilizáveis de apresentação.

## Requisitos

- Node.js e npm instalados.
- Um navegador moderno.

## Instalação e execução

Os comandos devem ser executados na pasta `front`, onde se encontra o `package.json`.

1. Clonar o repositório:

   ```bash
   git clone https://github.com/Kardogalrica/SuportRequest.git
   ```

2. Entrar na pasta do frontend:

   ```bash
   cd SuportRequest/front
   ```

3. Instalar as dependências:

   ```bash
   npm install
   ```

4. Iniciar o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

O Vite apresenta no terminal o endereço local para abrir a aplicação no navegador.

## Scripts disponíveis

Executar estes comandos a partir de `front/`:

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento Vite. |
| `npm run build` | Gera a versão de produção em `dist/`. |
| `npm run preview` | Pré-visualiza localmente a build de produção. |
| `npm run lint` | Executa o ESLint para analisar o código. |

## Navegação

As rotas definidas atualmente em `src/App.jsx` são:

| Rota | Finalidade |
| --- | --- |
| `/` | Redireciona para `/dashboard`. |
| `/dashboard` | Dashboard de pedidos de suporte. |
| `/dashboardUser` | Dashboard de utilizadores. |
| `/EditSuportRequest` | Formulário de pedido; pode receber o parâmetro `Id` para abrir um registo existente. |

Exemplo de edição: `/EditSuportRequest?Id=1`.

## Persistência e limitações conhecidas

- Os pedidos são guardados no `localStorage` do navegador, através da chave `SuportRequests`.
- Os dados ficam no navegador e perfil em que foram criados; limpar os dados do navegador pode removê-los.
- Não foi identificado um serviço backend ou uma base de dados remota nesta versão do projeto.
- A página de utilizadores é uma interface inicial e não representa, por si só, um sistema de autenticação ou de gestão de contas funcional.
- A existência de campos e validações para anexos não significa que os ficheiros sejam enviados para um servidor.
- O projeto deve ser considerado um protótipo frontend até existir uma camada de backend e persistência adequada para utilização multiutilizador.

## Licença

O repositório inclui um ficheiro [LICENSE](LICENSE) com a licença MIT.
