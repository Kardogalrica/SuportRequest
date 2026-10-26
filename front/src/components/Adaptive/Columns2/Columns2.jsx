const Columns2 = ({ Column1 = ''
                    ,Column2 = ''
                    ,ExtendedClass = ''
                }) => {
  return (
    <div className= {`container-full text-start w-100 ${ExtendedClass}`}>
        <div className='row align-items-start'>
            <div className='col'>
                {Column1}
            </div>
            <div className='col'>
                {Column2}
            </div>
        </div>      
    </div>
  )
}

export default Columns2
