# LayoutModal

Layout interno para organizar o conteudo de uma modal Bootstrap em cabecalho, corpo e rodape.

## Props

- `Header`: conteudo JSX renderizado na area de cabecalho.
- `Content`: conteudo JSX renderizado no corpo da modal.
- `Action`: conteudo JSX renderizado na area de acoes do rodape.

Todas as props sao opcionais e possuem valor padrao vazio.

## Exemplo

```jsx
<Modal
	Content={
		<LayoutModal
			Header={
				<>
					<h1 className="modal-title fs-5 text-primary">Titulo da modal</h1>
					<button type="button" className="btn-close fs-6" aria-label="Fechar" />
				</>
			}
			Content={<p>Conteudo da modal.</p>}
			Action={
				<>
					<button type="button" className="btn btn-outline-primary border border-0">Cancelar</button>
					<button type="button" className="btn btn-primary">Guardar</button>
				</>
			}
		/>
	}
/>
```

## Comportamento

O componente renderiza um elemento com a classe `modal-content` contendo:

- um cabecalho com as classes `modal-header` e `border-bottom-0`;
- um corpo com a classe `modal-body`;
- um rodape com as classes `modal-footer` e `border-top-0`.

O controle de exibicao da modal e a estrutura externa, como `modal-dialog`, sao responsabilidade do componente `Modal`.
