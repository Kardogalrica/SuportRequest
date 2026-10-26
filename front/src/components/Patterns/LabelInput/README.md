# LabelInput

Componente pattern para agrupar um texto de label, um campo de entrada e uma mensagem de validacao opcional.

## Props

- `Label`: conteudo exibido acima do input.
- `Input`: componente ou elemento JSX do campo de entrada.
- `ErrorMenssague`: mensagem exibida quando a validacao estiver ativa.
- `ShowValidation`: controla se a mensagem de erro deve aparecer.
- `ExtendedClass`: classes CSS extras aplicadas ao bloco principal do label e input.

## Exemplo

```jsx
<LabelInput
	Label={<label htmlFor="nome">Nome</label>}
	Input={<input id="nome" className="form-control" />}
	ErrorMenssague="Informe o nome."
	ShowValidation={showValidation}
	ExtendedClass="gap-1"
/>
```

## Comportamento

Quando `ShowValidation` for `true`, o componente renderiza `ErrorMenssague` abaixo do campo com a classe `text-danger`. Quando for `false`, apenas o label e o input sao exibidos.
