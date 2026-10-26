import { useState } from 'react'

const LayoutForm = ({
            Menu=''
            ,Sidebar = ''
            ,Content
        }) => {
    const [showOffcanvas, setShowCanvas] = useState(true)
  return (
    <>
        <div className="position-sticky border-bottom p-3 top-0" style={{zIndex: "1060", height:'80px', background:'white'}}>
            {Menu}
        </div>
        <div className='container-full p-5'>
            <div className="d-flex justify-content-end" style={{height: "30px"}}>
                {!showOffcanvas && (
                    <a className="icon-link fs-2"
                        onClick={() => {setShowCanvas(true)}}
                    >
                        <i className="bi bi-arrow-right-circle"></i>
                    </a>)
                }
            </div>
            <div className={`offcanvas offcanvas-end bg-light bg-light bg-gradient border-start-0 ${showOffcanvas ? 'show' : ''}`} style={{marginTop:'80px'}}>
                <div className="offcanvas-header" style={{marginTop:'20px'}}>
                    {showOffcanvas && (
                        <a className="icon-link fs-2"
                            onClick={() => {setShowCanvas(false)}}
                        >
                            <i className="bi bi-arrow-left-circle"></i>
                        </a>
                        )
                    }
                </div>
                <div className="offcanvas-body">
                    {Sidebar}
                </div>
            </div>
            <div className='' 
                style={{width: showOffcanvas ? 'calc(100% - 400px)' : '100%'}}
                >
                {Content}
            </div>
        </div>
    </>
  )
}

export default LayoutForm
