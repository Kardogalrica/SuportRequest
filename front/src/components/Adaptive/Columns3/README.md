# Columns3

Componente adaptive para organizar tres conteudos lado a lado usando a grid do Bootstrap.

## Props

- `Column1`: conteudo JSX renderizado na primeira coluna.
- `Column2`: conteudo JSX renderizado na segunda coluna.
- `Column3`: conteudo JSX renderizado na terceira coluna.
- `ExtendedClass`: classes CSS extras aplicadas ao container principal.

## Exemplo

```jsx
<Columns3
	Column1={<LabelInput Label="Nome" Input={<input className="form-control" />} />}
	Column2={<LabelInput Label="Email" Input={<input className="form-control" />} />}
	Column3={<LabelInput Label="Telefone" Input={<input className="form-control" />} />}
	ExtendedClass="mb-3"
/>
```

## Comportamento

O componente renderiza um container com `container-full`, `text-start` e `w-100`. Dentro dele, os tres conteudos sao distribuidos em uma `row` com tres colunas Bootstrap `col`.
