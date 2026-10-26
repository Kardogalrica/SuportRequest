import IF from '../../Widgets/IF/IF'

const LabelInput = ({Label = '', 
                      Input = '', 
                      ErrorMenssague = '', 
                      ShowValidation = false, 
                      ExtendedClass = ''
                    }) => {


  return (
    <div>
      <div className={`d-flex flex-column mb-1 ${ExtendedClass}`}>
        <div className='text-start'>
          {Label}
        </div>
        <div>
          {Input}
        </div>        
      </div>
      <IF
        Condition={ShowValidation}
        True={
          <div className='text-start text-danger'>{ErrorMenssague}</div>
        }
        False=''
      />
    </div>

  )
}

export default LabelInput
