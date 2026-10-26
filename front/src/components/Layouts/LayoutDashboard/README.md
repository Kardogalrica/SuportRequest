# LayoutForm

Layout principal para organizar um menu fixo no topo, uma sidebar lateral recolhivel e o conteudo da pagina.

## Props

- `Menu`: conteudo JSX renderizado no menu superior. Por padrao, e vazio.
- `Sidebar`: conteudo JSX renderizado dentro da sidebar. Por padrao, e vazio.
- `Content`: conteudo JSX renderizado na area principal.

## Exemplo

```jsx
<LayoutForm
	Menu={<nav>Menu principal</nav>}
	Sidebar={
		<nav aria-label="Navegacao lateral">
			<a href="/inicio">Inicio</a>
		</nav>
	}
	Content={<main><h1>Formulario</h1></main>}
/>
```

## Comportamento

- O `Menu` e renderizado em uma barra fixa no topo, com altura de `80px`.
- A `Sidebar` inicia aberta em um offcanvas alinhado a direita.
- Quando aberta, a sidebar ocupa `400px` de largura e a area de conteudo ocupa o espaco restante.
- O icone de seta permite fechar a sidebar. Quando fechada, o conteudo ocupa `100%` da largura e uma seta permite reabri-la.
- A sidebar recebe margem superior de `80px` para nao sobrepor o menu.

O componente utiliza as classes utilitarias do Bootstrap 5 e depende dos icones Bootstrap Icons para exibir as setas.
