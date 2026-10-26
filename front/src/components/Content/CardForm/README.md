# CardForm

Componente de conteudo para agrupar uma secao de formulario dentro de um card Bootstrap.

## Props

- `Title`: titulo exibido no topo do card.
- `Content`: conteudo JSX renderizado dentro do corpo do card.
- `ExtendedClass`: classes CSS extras aplicadas ao container principal do card.

## Exemplo

```jsx
<CardForm
	Title="Dados do viajante"
	Content={
		<>
			<LabelInput
				Label={<label htmlFor="nome">Nome</label>}
				Input={<input id="nome" className="form-control" />}
			/>
			<LabelInput
				Label={<label htmlFor="email">Email</label>}
				Input={<input id="email" type="email" className="form-control" />}
			/>
		</>
	}
	ExtendedClass="w-100"
/>
```

## Comportamento

O componente renderiza um card com as classes `card`, `p-4`, `mb-5` e `shadow`. O conteudo interno e organizado em coluna com `d-flex`, `flex-column`, `gap-3` e `ms-3`.
