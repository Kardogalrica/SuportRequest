import { Users } from './Data/Users/User'

import { useState } from 'react'

import Columns2 from '../Adaptive/Columns2/Columns2'

import Modal from '../Widgets/Modal/Modal'
import LayoutModal from '../Layouts/LayoutModal/LayoutModal'

import LabelInput from '../Patterns/LabelInput/LabelInput'

const DashBoardUser = () => {
    Users.init()

    const [data, setData] = useState([...Users.data])
    const [showPopupCriaUser, setShowPopupCriaUser] = useState(false)
  return (
    <>
    <Columns2
    Column2={
        <>
        <div
        className='d-flex justify-content-end'
        >
            <button
            type='button'
            className='btn btn-primary'
            onClick={() => {setShowPopupCriaUser(true)}}
            >
                Criar Novo Utilizador
            </button>
        </div>
        </>
    }
    ExtendedClass='mb-3'
    />
    <table className="table">
        <thead>
            <tr>
                <th scope="col">Nome</th>
                <th scope="col">Email</th>
                <th scope="col">Roles</th>
                <th scope="col">Ações</th>
            </tr>
        </thead>
        <tbody>
        {data.map((d) => (
            <tr key={d.Id}>
                <td>{d.Name}</td>
                <td>{d.Email}</td>
                <td>{d.roles.join(';')}</td>
                <td>
                    <i className="bi bi-pencil-square"></i>
                </td>
            </tr>
        ))}
        </tbody>
    </table>
        <Modal
		showModal={showPopupCriaUser}
		Content={
			<LayoutModal
				Header={
					<>
					<h1 className="modal-title fs-5 text-primary">Cria Atualiza Utilizador</h1>
					<button
						type="button"
						className="btn-close fs-6"
						aria-label="Fechar"
						onClick={() => setShowPopupCriaUser(false)}
					/>
					</>
				}
				Content={
                    <>
                    <LabelInput
                    Label={
                        <label className='form-label'>
                            Nome <span className="text-danger">*</span>
                        </label>
                    }
                    Input={
                        <>
                    <input
                      id="Nome"
                      className="form-control"
                      type="text"
                    />
                        </>
                    }
                    />
                    <LabelInput
                    Label={
                        <label className='form-label'>
                            Email <span className="text-danger">*</span>
                        </label>
                    }
                    Input={
                        <>
                    <input
                      id="Email"
                      className="form-control"
                      type="email"
                    />
                        </>
                    }
                    />
                    <LabelInput
                    Label={
                        <label className='form-label'>
                            PassWord <span className="text-danger">*</span>
                        </label>
                    }
                    Input={
                        <>
                    <input
                      id="Roles"
                      className="form-control"
                      type="password"
                    />
                        </>
                    }
                    />
                    <LabelInput
                    Label={
                        <label className='form-label'>
                            Roles <span className="text-danger">*</span>
                        </label>
                    }
                    Input={
                        <>
                        <div
                        className='d-flex gap-5'
                        >
                            <div className="form-check">
                                <input 
                                className="form-check-input" 
                                type="checkbox" 
                                value="" 
                                id="checkDefault"/>
                                <label className="form-check-label" htmlFor="checkDefault">
                                    Admin
                                </label>
                            </div>
                            <div className="form-check">
                                <input 
                                className="form-check-input" 
                                type="checkbox" 
                                value="" 
                                id="checkChecked"/>
                                <label className="form-check-label" htmlFor="checkChecked">
                                    Regular
                                </label>
                            </div>
                        </div>
                        </>
                    }
                    />
                    </>
                }
				Action={
				    <>
					<button
					type="button"
					className="btn btn-outline-primary border border-0"
					onClick={() => setShowPopupCriaUser(false)}
					>
						Cancelar
					</button>
					<button
					type="button"
					className="btn btn-primary"
					onClick={() => setShowPopupCriaUser(false)}
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

export default DashBoardUser
