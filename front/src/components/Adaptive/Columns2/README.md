# Columns2

Componente adaptive para organizar dois conteudos lado a lado usando a grid do Bootstrap.

## Props

- `Column1`: conteudo JSX renderizado na primeira coluna.
- `Column2`: conteudo JSX renderizado na segunda coluna.
- `ExtendedClass`: classes CSS extras aplicadas ao container principal.

## Exemplo

```jsx
<Columns2
	Column1={<LabelInput Label="Nome" Input={<input className="form-control" />} />}
	Column2={<LabelInput Label="Email" Input={<input className="form-control" />} />}
	ExtendedClass="mb-3"
/>
```

## Comportamento

O componente renderiza um container com `container-full`, `text-start` e `w-100`. Dentro dele, os dois conteudos sao distribuidos em uma `row` com duas colunas Bootstrap `col`.
