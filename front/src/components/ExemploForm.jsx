import { useState } from 'react'
import LabelInput from './Patterns/LabelInput/LabelInput'
import Columns2 from './Adaptive/Columns2/Columns2'
import Columns3 from './Adaptive/Columns3/Columns3'
import CardForm from './Content/CardForm/CardForm'

const ExemploForm = () => {

    const [validationEmail, setvalidationEmail] = useState(false)
    const [valortext, setvalortext] = useState('')

  return (
    <>
    <button onClick={() =>{
      setvalidationEmail(!validationEmail)
      setvalortext('olá')
      }}>clique</button>
      <CardForm
        Title={'Formulário'}
        Content={
          <>
            <Columns3
              Column1={
                <LabelInput
                  Label={<label className='form-label'>Input Text</label>}
                  Input={<input type="text" className='form-control' value={valortext} onChange={(e) => {setvalortext(e.target.value)}}></input>}
                  ErrorMenssague={'Campo Obrigatório!'}
                  ShowValidation = {validationEmail}
                ></LabelInput>
              }
              Column2={
                <LabelInput
                  Label={<label className='form-label'>Input Email</label>}
                  Input={<input type="email" className='form-control'></input>}
                  ErrorMenssague={'Campo Obrigatório!'}
                  ShowValidation = {validationEmail}
                ></LabelInput>
              }
              Column3={
                <LabelInput
                  Label={<label className='form-label'>Input number</label>}
                  Input={<input type="number" className='form-control'></input>}
                  ErrorMenssague={'Campo Obrigatório!'}
                  ShowValidation = {validationEmail}
                ></LabelInput>
              }
            ></Columns3>
          </>
        }
      >
      </CardForm>
      <CardForm
        Title={'Formulário part2'}
        Content={
          <Columns3
              Column1={
                <LabelInput
                  Label={<label className='form-label'>Input date</label>}
                  Input={<input type="date" className='form-control'></input>}
                  ErrorMenssague={'Campo Obrigatório!'}
                  ShowValidation = {validationEmail}
                ></LabelInput>
              }
              Column2={
                <LabelInput
                  Label={<label className='form-label'>Input Date Time</label>}
                  Input={<input type="datetime-local" className='form-control'></input>}
                  ErrorMenssague={'Campo Obrigatório!'}
                  ShowValidation = {validationEmail}
                ></LabelInput>
              }
              Column3={
                <LabelInput
                  Label={<label className='form-label'>Input radio</label>}
                  Input={
                            <Columns2
                              Column1={
                                <div className="form-check">
                                  <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault1"></input>
                                  <label className="form-check-label" for="radioDefault1">
                                    Default radio
                                  </label>
                                </div>
                                }
                              Column2={
                                <div className="form-check">
                                  <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault2"></input>
                                  <label className="form-check-label" for="radioDefault2">
                                    Default checked radio
                                  </label>
                                </div>
                              }
                            >
                            </Columns2>
                        }
                ></LabelInput>
              }
            ></Columns3>
        }
      >
      </CardForm>
      <CardForm
        Title={'Formulário part3'}
        Content={
          <>
            <Columns3
            Column1={
              <LabelInput
                Label={<label className='form-label'>Switch</label>}
                Input={
                  <div className='form-check form-switch'>
                    <input className="form-check-input" type="checkbox" role="switch" id="switchCheckDefault"></input>
                  </div>
                }  
              ></LabelInput>
            }
            Column2={
              <LabelInput
                Label={<label className='form-label'>Select</label>}
                Input={
                  <select class="form-select" aria-label="Default select example">
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                }
              >
              </LabelInput>
            }
            >
            </Columns3>
          </>
        }
      >
      </CardForm>
      <input type='text' value={valortext}></input>
    </>
  )
}

export default ExemploForm
