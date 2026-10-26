import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams} from "react-router-dom"

/* UI/UX */
import CardForm from '../Content/CardForm/CardForm'
import Columns3 from '../Adaptive/Columns3/Columns3'
import Columns2 from '../Adaptive/Columns2/Columns2'
import LabelInput from '../Patterns/LabelInput/LabelInput'
import UploadMultifile from '../Patterns/UploadMultifile/UploadMultifile'
import Modal from '../Widgets/Modal/Modal'
import LayoutModal from '../Layouts/LayoutModal/LayoutModal'
import IF from '../Widgets/IF/IF'
/* Data */
import { RecordSuportRequest } from './Data/SuportRequest/SuportRequest'
import { Categories} from './Data/Categories/Data_Categories'
import { Departments } from './Data/Departments/Data_Departments'
import { Priorities} from './Data/Priorities/Data_Priorities'
/* Function */
import { updateField } from './Action/updateField'
import { validateSupportRequest } from './Action/validateSupportRequest'

function SupportRequestForm() {

  const [searchParams] = useSearchParams()
  const recordId = Number(searchParams.get('Id') ?? 0)

  const [form, setForm] = useState({})

  const [errors, setErrors] = useState({
    department:{MenssagemErro:'', IsValid:true},
    category:{MenssagemErro:'', IsValid:true},
    priority:{MenssagemErro:'', IsValid:true},
    subject:{MenssagemErro:'', IsValid:true},
    description:{MenssagemErro:'', IsValid:true},
    occurrenceDate:{MenssagemErro:'', IsValid:true},
    assetReference:{MenssagemErro:'', IsValid:true},
    attachments:{MenssagemErro:'', IsValid:true}
  })

  const [showPopupCancelar, setShowPopupCancelar] = useState(false)

  const [showPopupConfirmar, setShowPopupConfirmar] = useState(false)

  const [departments, setDepartments] = useState([])

  const [categories, setCategories] = useState([])

  const [priorities, setPriorities] = useState([])

  const navigate = useNavigate()


  /* Inicializacao */

const RecordSuportRecord = new RecordSuportRequest()

useEffect(() => {
    RecordSuportRecord.init(recordId)
    setForm({ ...RecordSuportRecord.record })

  setDepartments(Departments.data.map(({ Label }) => Label))
  setCategories(Categories.data.map(({ Label }) => Label))
  setPriorities(Priorities.data.map(({ Label }) => Label))
}, [recordId])

  const onChange = (field, value) => {
    updateField(setForm, setErrors, field, value)
  }

const onSubmit = () => {
    const ErrorMenssague = validateSupportRequest(form)
    setErrors(ErrorMenssague)
    if(
      ErrorMenssague.department.IsValid
      && ErrorMenssague.category.IsValid
      && ErrorMenssague.priority.IsValid
      && ErrorMenssague.subject.IsValid
      && ErrorMenssague.description.IsValid
      && ErrorMenssague.occurrenceDate.IsValid
      && ErrorMenssague.assetReference.IsValid
      && ErrorMenssague.attachments.IsValid
    ) {
      setShowPopupConfirmar(true)
    }
}

const onCancel = () => {
  setShowPopupCancelar(true)
}

const onCloseCancel = () => setShowPopupCancelar(false)

const onCancelarPedido = () => {
    const updatedForm = {
    ...form,
    status: 'Cancelado'
  }

  RecordSuportRecord.setRecord(updatedForm)
  RecordSuportRecord.save()
  navigate('/dashboard')
}

const onSubmeterPedido = () => {
  const updatedForm = {
    ...form,
    status:'Submetido',
    /* ver isto, o que acontece caso o formulário já tenha sido submetido uma vez? */
    ticket: form.ticket || `SUP-${Date.now().toString().slice(-6)}`
  }

  RecordSuportRecord.setRecord(updatedForm)
  RecordSuportRecord.save()
  navigate('/dashboard')
}

const onDevolverPedido = () => {
  const updatedForm = {
    ...form,
    status: 'Devolvido'
  }

  RecordSuportRecord.setRecord(updatedForm)
  RecordSuportRecord.save()
  navigate('/dashboard')
}

const onConcluirPedido = () => {
  const updatedForm = {
    ...form,
    status: 'Concluido'
  }

  RecordSuportRecord.setRecord(updatedForm)
  RecordSuportRecord.save()
  navigate('/dashboard')
}

const onCloseConfirm = () => setShowPopupConfirmar(false)

const today = new Date().toISOString().split('T')[0]

  return (
    <>
      {/* Inicio Header Form */}
      <header className="mb-4">
        <h1 className="display-6 fw-bold mb-2">Pedido de Suporte</h1>
        <p className="text-secondary mb-0">
          Registe o seu pedido e acompanhe a resolução com a equipa de IT.
        </p>
      </header>
      {/* Fim header Form */}

      {/* Ticket form */}
      <IF
        Condition={form.ticket !== ''}
        True={
          <>
            <div className="alert alert-success" role="status">
              Número de ticket:
              <strong> {form.ticket}</strong>
            </div>
          </>
        }
        False=''
      />
      {/* Fim Ticket Form */}

      {/* Inicio Form */}
      <form onSubmit={(event) => event.preventDefault()} noValidate>
        {/* Inicio Dados Requerente */}
        <CardForm Title={
          <>
            <span
              className='h4'
            >Dados do requerente</span>
            <span
              className='m-3 p-2 h6 border rounded-pill bg-info-subtle'
            >{form.status}</span>
          </>
          }
        Content={
          <>
            <Columns3
              Column1={
                /* Nome Completo */
                <LabelInput
                  Label={
                    <label className='form-label'>
                      Nome completo
                    </label>}
                  Input={
                    <input
                      id="applicantName"
                      className="form-control"
                      value={form.applicantName}
                      maxLength={100}
                      readOnly
                      disabled
                    />
                  }
                  ErrorMenssague=''
                  ShowValidation=''
                />
              }
              Column2={
                /* Email */
                <LabelInput
                  Label={
                    <label className='form-label'>
                      Email
                    </label>}
                  Input={
                    <input
                      id="applicantEmail"
                      className="form-control"
                      type="email"
                      value={form.applicantEmail}
                      readOnly
                      disabled
                    />
                  }
                  ErrorMenssague=''
                  ShowValidation=''
                />
              }
              Column3={
                /* Departamento */
                <LabelInput
                  Label={
                    <>
                    <label className='form-label'>
                      Departamento <span className="text-danger">*</span>
                    </label>
                    </>
                  }
                  Input={
                    <select
                      id="department"
                      className="form-select"
                      value={form.department}
                      disabled={!(recordId === 0 || form.status === 'Devolvido')}
                      onChange={(event) => onChange('department', event.target.value)}
                    >
                      <option value="">Selecione o departamento</option>
                      {departments.map((department) => (
                        <option key={department}>{department}</option>
                      ))}
                    </select>
                  }
                  ErrorMenssague={errors.department.MenssagemErro}
                  ShowValidation={!errors.department.IsValid}
                />
              }
              ExtendedClass="row-gap-3"
            />
          </>
        } />
        {/* Fim Dados Requerente */}
        {/* Inicio Detalhes do Pedido */}
        <CardForm Title="Detalhes do pedido" Content={
          <>
            <Columns3
              Column1={
                /* Categoria */
                <LabelInput
                  Label={
                    <>
                      {
                    <label className='form-label'>
                      Categoria <span className="text-danger">*</span>
                    </label>}
                    </>
                  }
                  Input={
                    <select
                      id="category"
                      className="form-select"
                      value={form.category}
                      disabled={!(recordId === 0 || form.status === 'Devolvido')}
                      onChange={(event) => onChange('category', event.target.value)}
                    >
                      <option value="">Selecione a categoria</option>
                      {categories.map((category) => (
                        <option key={category}>{category}</option>
                      ))}
                    </select>
                  }
                  ErrorMenssague={errors.category.MenssagemErro}
                  ShowValidation={!errors.category.IsValid}
                />
              }
              Column2={
                /* Perioridade */
                <LabelInput
                  Label={
                    <>
                    <label className='form-label'>
                      Prioridade <span className="text-danger">*</span>
                    </label>
                    </>
                  }
                  Input={
                    <div className="d-flex flex-wrap gap-2 pt-2">
                      {priorities.map((priority) => (
                        <LabelInput
                          key={priority}
                          Label={priority}
                          Input={
                            <input
                              className="form-check-input"
                              type="radio"
                              name="priority"
                              value={priority}
                              checked={form.priority === priority}
                              disabled={!(recordId === 0 || form.status === 'Devolvido')}
                              onChange={(event) =>
                                onChange('priority', event.target.value)
                              }
                            />
                          }
                          ExtendedClass="d-inline-flex flex-row align-items-center gap-1 me-2"
                        />
                      ))}
                    </div>
                  }
                  ErrorMenssague={errors.priority.MenssagemErro}
                  ShowValidation={!errors.priority.IsValid}
                />
              }
              Column3={
                /* Assunto */
                <LabelInput
                  Label={
                    <>
                    <label className='form-label'>
                      Assunto <span className="text-danger">*</span>
                    </label>
                    </>
                  }
                  Input={
                    <input
                      id="subject"
                      className="form-control"
                      value={form.subject}
                      maxLength={150}
                      disabled={!(recordId === 0 || form.status === 'Devolvido')}
                      onChange={(event) => onChange('subject', event.target.value)}
                    />
                  }
                  ErrorMenssague={errors.subject.MenssagemErro}
                  ShowValidation={!errors.subject.IsValid}
                />
              }
              ExtendedClass="row-gap-3"
            />

            <LabelInput
            /* Descrição */
              Label={
                <>
                  <label className='form-label'>
                    Descrição <span className="text-danger">*</span>
                  </label>

                </>
              }
              Input={
                <>
                  <textarea
                    id="description"
                    className="form-control"
                    rows="6"
                    maxLength={5000}
                    value={form.description}
                    disabled={!(recordId === 0 || form.status === 'Devolvido')}
                    onChange={(event) => onChange('description', event.target.value)}
                  />
                  <div className="form-text">{(form.description ?? '').length}/5000 caracteres</div>
                </>
              }
              ErrorMenssague={errors.description.MenssagemErro}
              ShowValidation={!errors.description.IsValid}
            />
          </>
        } />
        {/* Fim Detalhes do Pedido */}
        {/* Inicio Imformaçoes Complementares */}
        <CardForm
          Title="Informações complementares"
          Content={
            <>
            <Columns2
              Column1={
                <LabelInput
                  Label={
                    <>
                    <label className='form-label'>
                      Equipamento afetado
                      {form.category === 'Acesso e Permissões' && (
                        <span className="text-danger"> *</span>
                      )}
                    </label>
                    </>
                  }
                  Input={
                    <input
                      id="assetReference"
                      className="form-control"
                      value={form.assetReference}
                      maxLength={50}
                      disabled={!(recordId === 0 || form.status === 'Devolvido')}
                      onChange={(event) =>
                        onChange('assetReference', event.target.value)
                      }
                    />
                  }
                  ErrorMenssague={errors.assetReference.MenssagemErro}
                  ShowValidation={!errors.assetReference.IsValid}
                />
              }
              Column2={
                <LabelInput
                  Label={
                    <>
                    <label className='form-label'>
                      Data da ocorrência <span className="text-danger">*</span>
                    </label>
                    </>
                  }
                  Input={
                    <input
                      id="occurrenceDate"
                      className="form-control"
                      type="date"
                      max={today}
                      value={form.occurrenceDate}
                      disabled={!(recordId === 0 || form.status === 'Devolvido')}
                      onChange={(event) =>
                        onChange('occurrenceDate', event.target.value)
                      }
                    />
                  }
                  ErrorMenssague={errors.occurrenceDate.MenssagemErro}
                  ShowValidation={!errors.occurrenceDate.IsValid}
                />
              }
              ExtendedClass="row-gap-3 mb-3"
            />
            <Columns2
            Column1={
              <>
                <LabelInput
                  Label={
                    <label className='form-label'>
                      Anexos
                    </label>}
                  Input={
                    <>
                        <UploadMultifile
                        initData={form.attachments}
                        accept={'.pdf,.png,.jpg,.jpeg,.docx,.xlsx'}
                        MaxFiles={5}
                        isEdit={(recordId === 0 || form.status === 'Devolvido')}
                        eventoReturn={(data) => (onChange('attachments', data))}
                        />
                      <div className="form-text">Até 5 ficheiros, 10 MB por ficheiro.</div>
                    </>
                  }
                  ErrorMenssague={errors.attachments.MenssagemErro}
                  ShowValidation={!errors.attachments.IsValid}
                />
              </>
            }
            ExtendedClass="row-gap-3"
            />
            </>
          }
        />
        {/* Fim Informaçoes Complementares */}
        {/* Actions Form */}
        <Columns2
          Column1={
            <>
            <div className='d-flex flex-column flex-sm-row justify-content-start gap-2'>
              <Link 
              to="/dashboard"
              className='btn btn-outline-primary'
              >Voltar</Link>
            </div>
            </>
          }
          Column2={
          <>
            <div className="d-flex flex-column flex-sm-row justify-content-end gap-2">          
              <IF
                Condition={form.status === 'Submetido'}
                True={
                  <>
                    <button
                      type="button"
                      className="btn btn-outline-warning"
                      onClick={onCancel}
                    >
                      Cancelar
                    </button> 
                    <button
                      type="button"
                      className="btn btn-outline-warning"
                      onClick={onDevolverPedido}
                    >
                      Devolver
                    </button>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={onConcluirPedido}
                    >
                      Concluir
                    </button>                
                  </>
                }
              />
              <IF
                Condition={recordId === 0 || form.status === 'Devolvido'}
                True={
                  <>
                    <button type="button" className="btn btn-primary" onClick={onSubmit}>
                      Submeter
                    </button>                  
                  </>
                }
              />
            </div>
          </>
          }
        />
        {/* Fim Action Form */}
      </form>
      {/* Fim Form */}

      {/* Modal Calcelar */}
      <Modal showModal={showPopupCancelar} Content={
        <>
          <LayoutModal
            Header={
              <>
                <h2 className="modal-title fs-5">Cancelar pedido?</h2>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Fechar"
                  onClick={onCloseCancel}
                />
              </>
            }
            Content={
              <p className="mb-0">
                Existem alterações não guardadas. Deseja sair desta página?
              </p>
            }
            Action={
              <>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={onCloseCancel}
                >
                  Fechar
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={onCancelarPedido}
                >
                  Cancelar
                </button>
              </>
            }
          />
        </>
      } />

      {/* Modal Comfirmar */}
      <Modal showModal={showPopupConfirmar} Content={
        <>
          <LayoutModal
            Header={
              <>
                <h2 className="modal-title fs-5">Confirmar pedido</h2>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Fechar"
                  onClick={onCloseConfirm}
                />
              </>
            }
            Content={
              <p className="mb-0">
                Todos os campos estão válidos. Deseja submeter este pedido de suporte?
              </p>
            }
            Action={
              <>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={onCloseConfirm}
                >
                  Fechar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onSubmeterPedido}
                >
                  Confirmar
                </button>
              </>
            }
          />
        </>
      } />
    </>
  )
}

export default SupportRequestForm
