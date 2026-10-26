import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

import { SuportRequests } from './Data/SuportRequest/SuportRequest'
import { Departments } from './Data/Departments/Data_Departments'
import { Priorities} from './Data/Priorities/Data_Priorities'

import Columns2 from '../Adaptive/Columns2/Columns2'
import Columns3 from '../Adaptive/Columns3/Columns3'

import LabelInput from '../Patterns/LabelInput/LabelInput'

const Dashboard = () => {
    SuportRequests.init()

    const dataSuport = [...SuportRequests.data]

    var dataSuportFiltro = dataSuport.filter((el) => (el.status === 'Submetido' || el.status === 'Devolvido'))

    const [data, setData] = useState([...dataSuportFiltro])
    const [departments, setDepartments] = useState(Departments.data.map(({ Label }) => Label))
    const [priorities, setPriorities] = useState(Priorities.data.map(({ Label }) => Label))
    const [pedido, setPedido] = useState('Aberto')
    const [ticket, setTicket] = useState('')
    const [department, setDepartment] = useState('')
    const [priority, setPriority] = useState('')

    useEffect(() => {
        FiltroPedidos()
    },[pedido])

    function FiltroPedidos() {
        if(pedido === 'Aberto') {
            dataSuportFiltro = dataSuport.filter((el) => (el.status === 'Submetido' || el.status === 'Devolvido'))
        }

        if(pedido === 'Fechado') {
            dataSuportFiltro = dataSuport.filter((el) => (el.status === 'Concluido' || el.status === 'Fechado'))
        }

        var dataSuportFiltroPesquisa = dataSuportFiltro.filter((el) => (
            ticket === '' || el.ticket === ticket
        )).filter((el) => (
            department === ''
            || el.department === department
        )).filter((el) => (
            priority === ''
            || el.priority === priority
        ))

        setData(dataSuportFiltroPesquisa)
    }

    function ChangePedidos(tipoPedido) {
        setPedido(tipoPedido)
    }

    function LimparFiltros() {
        setTicket('')
        setDepartment('')
        setPriority('')

        if(pedido === 'Aberto') {
            dataSuportFiltro = dataSuport.filter((el) => (el.status === 'Submetido' || el.status === 'Devolvido'))
        }

        if(pedido === 'Fechado') {
            dataSuportFiltro = dataSuport.filter((el) => (el.status === 'Concluido' || el.status === 'Fechado'))
        }

        setData(dataSuportFiltro)

    }

  return (
    <> {/* Cabeçalho Dashboard */}
        <div className='container-full'>
            <div className='mb-4'>
                <div className='d-flex justify-content-between'>
                    <h4>Listagem de Pedidos</h4>
                    <Link 
                        className="btn btn-primary px-4"
                        to="/EditSuportRequest?Id=0">Criar Novo Pedido
                    </Link>
                </div>
            </div>
            <div
            className='ms-3'
            >
                {/* Filtros Abertos e fechados */}
                <div
                className='mb-5'
                >
                    <Columns2
                    Column2={
                        <>
                            <div
                            className='d-flex justify-content-end'
                            >
                                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                    <input type="radio" 
                                    className="btn-check" 
                                    name="btnradio" id="btnradio1"
                                    onChange={() => ChangePedidos('Aberto')}
                                    autoComplete="off" 
                                    defaultChecked/>
                                    <label className="btn btn-outline-primary" htmlFor="btnradio1">Pedidos Abertos</label>

                                    <input type="radio" 
                                    className="btn-check" 
                                    name="btnradio" 
                                    id="btnradio2"
                                    onChange={() => ChangePedidos('Fechado')}
                                    autoComplete="off"/>
                                    <label className="btn btn-outline-primary" htmlFor="btnradio2">Pedidos Fechados</label>
                                </div>
                            </div>
                        </>
                    }
                    />
                </div>
                {/* pesquisar por ticket, Departamento ou perioridade */}
                <div>
                    <div
                    className='card p-4 mb-4 shadow'
                    >
                        <Columns3
                        Column1={
                            <LabelInput
                            Label={
                                <label
                                className='form-label'
                                >
                                    Ticket
                                </label>
                            }
                            Input={
                                <input
                                value={ticket}
                                className='form-control'
                                onChange={(e) => setTicket(e.target.value)}
                                />
                            }
                            />
                        }
                        Column2={
                            <LabelInput
                            Label={
                                <label
                                className='form-label'
                                >
                                   Departamento
                                </label>
                            }
                            Input={
                                <select
                                    id="department"
                                    className="form-select"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    >
                                    <option value="">Selecione o departamento</option>
                                    {departments.map((department) => (
                                        <option key={department}>{department}</option>
                                    ))}
                                </select>
                            }
                            ExtendedClass='mb-3'
                            />
                        }
                        Column3={
                            <LabelInput
                            Label={
                                <label
                                className='form-label'
                                >
                                    Perioridade
                                </label>
                            }
                            Input={
                                <select
                                    id="Periority"
                                    className="form-select"
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    >
                                    <option value="">Selecione a perioridade</option>
                                    {priorities.map((prioriti) => (
                                        <option key={prioriti}>{prioriti}</option>
                                    ))}
                                </select>
                            }
                            />
                        }
                        />
                    <Columns2
                    Column2={
                        <>
                            <div
                            className='d-flex justify-content-end gap-3'
                            >
                                <button
                                className='btn btn-outline-primary'
                                type='button'
                                onClick={() => LimparFiltros()}
                                >
                                    Limpar
                                </button>
                                <button
                                className='btn btn-primary'
                                type='button'
                                onClick={() => FiltroPedidos()}
                                >
                                    Pesquisar
                                </button>
                            </div>
                        </>
                    }
                    />
                    </div>
                </div>
                {/* Tabela pedidos */}
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Ticket</th>
                        <th scope="col">Email</th>
                        <th scope="col">Departamento</th>
                        <th scope="col">Perioridade</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d) => (
                                <tr key={d.Id}>
                                    <td>{d.ticket}</td>
                                    <td>{d.applicantEmail}</td>
                                    <td>{d.department}</td>
                                    <td>{d.priority}</td>
                                    <td>{d.status}</td>
                                    <td>
                                        <Link 
                                        className="btn btn-primary px-4"
                                        to={`/EditSuportRequest?Id=${d.Id}`}>
                                            <i className="bi bi-pencil-square"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table> 
            </div> 
        </div>

    </>
  )
}

export default Dashboard
