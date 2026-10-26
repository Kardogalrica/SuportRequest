# IF

Componente widget para renderizar um de dois blocos conforme uma condicao booleana.

## Props

- `Condition`: valor booleano usado para escolher o bloco renderizado.
- `True`: conteudo renderizado quando `Condition` for `true`.
- `False`: conteudo renderizado quando `Condition` for `false`.

## Exemplo

```jsx
<IF
  Condition={isValid}
  True={<span>Valido</span>}
  False={<span>Invalido</span>}
/>
```