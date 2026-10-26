# UploadMultifile

Componente pattern para selecionar, gravar, listar, remover e descarregar varios ficheiros associados a um registo.

## Props

- `initData`: lista inicial de ficheiros ja guardados. Valor padrao: `[]`.
- `accept`: extensoes ou tipos MIME aceites pelo campo de selecao. Valor padrao: `.pdf,.png,.jpg,.jpeg,.docx,.xlsx`.
- `MaxFiles`: quantidade maxima de ficheiros permitida. Valor padrao: `5`.
- `isEdit`: define se os controlos de selecao, gravacao e remocao ficam disponiveis. Valor padrao: `true`.
- `eventoReturn`: funcao chamada depois de gravar ou remover ficheiros. Recebe a lista atualizada.

## Formato dos ficheiros

Cada ficheiro deve ser representado por um objeto com esta estrutura:

```js
{
	name: 'documento.pdf',
	type: 'application/pdf',
	content: 'data:application/pdf;base64,...'
}
```

Os ficheiros selecionados sao convertidos para Data URL com `FileReader`, permitindo guardar o conteudo juntamente com o registo.

## Exemplo

```jsx
const [attachments, setAttachments] = useState([])

<UploadMultifile
	initData={attachments}
	accept=".pdf,.png,.jpg,.jpeg"
	MaxFiles={5}
	isEdit={true}
	eventoReturn={setAttachments}
/>
```

## Comportamento

- Quando `isEdit` e `true`, apresenta o campo de selecao e o botao `Gravar`.
- A selecao pode conter varios ficheiros.
- Ao gravar, os ficheiros selecionados sao adicionados aos ficheiros recebidos em `initData`.
- Os ficheiros existentes sao apresentados numa tabela pelo nome.
- O botao de download converte o conteudo guardado num Blob e inicia a descarga no navegador.
- O botao de remocao fica disponivel apenas quando `isEdit` e `true`.
- Quando nao existem ficheiros, a tabela nao e apresentada.

## Responsabilidade do componente pai

O componente nao guarda automaticamente a lista recebida em `initData`. O componente pai deve atualizar o seu estado atraves de `eventoReturn`:

```jsx
function handleFilesChange(nextFiles) {
	setAttachments(nextFiles)
}
```

O componente tambem nao valida o tamanho dos ficheiros nem o tipo real do conteudo. A propriedade `accept` limita a selecao na interface, mas a validacao definitiva deve ser feita no fluxo do formulario e, posteriormente, no backend.

## Limite de ficheiros

`MaxFiles` define o limite esperado pelo componente. A aplicacao deve validar a quantidade total de ficheiros antes de persistir os dados, considerando os ficheiros ja existentes e os novos ficheiros selecionados.
