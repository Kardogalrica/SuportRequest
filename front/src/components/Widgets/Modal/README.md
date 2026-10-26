# Modal

Componente widget para exibir uma modal Bootstrap controlada pela prop `showModal`.

## Props

- `showModal`: controla se a modal deve ser exibida. Quando for `false`, o componente retorna `null`.
- `Content`: conteudo JSX renderizado dentro do container principal da modal.

## Exemplo

```jsx
import { useState } from 'react'
import Modal from './components/Widgets/Modal/Modal'
import LayoutModal from './components/Layouts/LayoutModal/LayoutModal'

function App() {
	const [showModal, setShowModal] = useState(false)

	return (
		<>
			<button
				className="btn btn-primary"
				onClick={() => setShowModal(true)}
			>
				Abrir modal
			</button>

			<Modal
				showModal={showModal}
				Content={
					<LayoutModal
						Header={
							<>
								<h1 className="modal-title fs-5 text-primary">Modal title</h1>
								<button
									type="button"
									className="btn-close fs-6"
									aria-label="Fechar"
									onClick={() => setShowModal(false)}
								/>
							</>
						}
						Content={<p>Conteudo da modal.</p>}
						Action={
							<>
								<button
									type="button"
									className="btn btn-outline-primary border border-0"
									onClick={() => setShowModal(false)}
								>
									Cancelar
								</button>
								<button
									type="button"
									className="btn btn-primary"
									onClick={() => setShowModal(false)}
								>
									Guardar
								</button>
							</>
						}
					/>
				}
			/>
		</>
	)
}
```

## Comportamento

Quando `showModal` for `true`, o componente:

- renderiza o container da modal com as classes `modal`, `fade`, `show` e `d-block`;
- renderiza o backdrop com as classes `modal-backdrop`, `fade` e `show`;
- adiciona a classe `modal-open` ao `body`.

Quando `showModal` for `false`, o componente remove a classe `modal-open` do `body` e nao renderiza a modal.

## Observacao

O componente ja cria `modal-dialog modal-dialog-centered`. Por isso, o `Content` deve fornecer apenas o conteudo interno, normalmente usando o componente `LayoutModal` para organizar `Header`, `Content` e `Action`.
