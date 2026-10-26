const CardForm = ({ Title = ''
                    ,Content = ''
                    ,ExtendedClass = ''
                  }) => {
  return (
    <div className={`card p-4 mb-5 shadow ${ExtendedClass}`}>
      <div className='h4 mb-4'>
        {Title}
      </div>
      <div className='d-flex flex-column gap-3 ms-3'>
        {Content}
      </div>
    </div>
  )
}

export default CardForm
