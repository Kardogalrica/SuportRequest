const LayoutForm = ({
            Menu=''
            ,Content
        }) => {
  return (
    <>
        <div className="position-sticky border-bottom p-3 top-0" style={{zIndex: "1060", height:'80px', background:'white'}}>
            {Menu}
        </div>
        <div className='container-full p-5'>
            <div className='' 
                >
                {Content}
            </div>
        </div>
    </>
  )
}

export default LayoutForm
