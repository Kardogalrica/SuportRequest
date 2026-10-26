# SupportRequestForm

Formulário para registo de pedidos de suporte de IT. A tela é composta com Bootstrap e organiza os campos em três cartões: dados do requerente, detalhes do pedido e informações complementares.

## Utilização

O componente não recebe props. Pode ser renderizado diretamente numa tela ou rota da aplicação:

```jsx
import SupportRequestForm from './components/SuportRequest/SupportRequestForm'

function SupportPage() {
	return <SupportRequestForm />
}
```

## Campos

### Dados do requerente

- `applicantName`: nome preenchido por defeito como `Joana Silva`; é somente leitura.
- `applicantEmail`: email preenchido por defeito como `joana.silva@empresa.pt`; é somente leitura.
- `department`: departamento do requerente; obrigatório.

### Detalhes do pedido

- `category`: categoria do pedido; obrigatória.
- `priority`: prioridade (`Baixa`, `Média`, `Alta` ou `Crítica`); `Média` é selecionada por defeito.
- `subject`: assunto do pedido, com limite de 150 caracteres; obrigatório.
- `description`: descrição do problema, com limite de 5.000 caracteres; obrigatória.

### Informações complementares

- `assetReference`: equipamento afetado, com limite de 50 caracteres. Torna-se obrigatório quando a categoria é `Acesso e Permissões`.
- `occurrenceDate`: data da ocorrência; obrigatória e não pode ser futura.
- `attachments`: lista de anexos nos formatos PDF, PNG, JPG, JPEG, DOCX ou XLSX. São permitidos até 5 ficheiros, com no máximo 10 MB por ficheiro.

## Fluxo do formulário

1. Cada alteração chama `updateField`, atualiza o estado `form`, limpa o erro do campo alterado e remove a mensagem de ticket anterior.
2. `Submeter pedido` chama `handleSubmit`, executa `validateSupportRequest` e mostra erros junto aos respetivos campos.
3. Quando não existem erros, é aberta uma modal de confirmação.
4. `Confirmar submissão` chama `confirmSubmit`, gera um número local no formato `SUP-XXXXXX` e exibe uma mensagem de sucesso.
5. `Rever pedido` ou o botão de fechar encerra a modal sem submeter.
6. `Limpar` repõe os campos editáveis aos valores iniciais, preservando nome e email do requerente.
7. `Cancelar` abre uma modal apenas quando existem alterações não guardadas. A ação `Sair` usa `window.history.back()`.

## Estado local

O componente mantém os seguintes estados com `useState`:

- `form`: valores dos campos e ficheiros selecionados.
- `errors`: mensagens de validação por campo.
- `isCanceling`: controla a modal de cancelamento.
- `isConfirming`: controla a modal de confirmação.
- `submittedTicket`: número do ticket exibido após a confirmação.

## Componentes utilizados

- `CardForm`: agrupa cada seção num cartão Bootstrap.
- `Columns3`: distribui os campos em três colunas responsivas.
- `LabelInput`: associa labels, inputs e mensagens de erro.
- `Modal` e `LayoutModal`: renderizam as modais de cancelamento e confirmação.
- `Action/*`: contém as funções de atualização, validação, limpeza, cancelamento e submissão.

## Observações

- O requerente e o email são atualmente dados estáticos definidos em `initialForm`.
- A confirmação não persiste dados nem comunica com um backend; o ticket é gerado no cliente com `Date.now()`.
- A validação de descrição exige pelo menos 20 caracteres, ou 100 caracteres quando a prioridade é `Crítica`.
- Os textos e os identificadores das categorias, departamentos e prioridades estão definidos no próprio componente.
