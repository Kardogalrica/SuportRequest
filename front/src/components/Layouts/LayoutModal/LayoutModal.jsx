const LayoutModal = ({
                      Header=''
                      ,Content=''
                      ,Action=''
                    }) => {
  return (
        
          <div className="modal-content">
            <div className="modal-header border-bottom-0">
              {Header}
            </div>
            <div className="modal-body">
              {Content}
            </div>

            <div className="modal-footer border-top-0">
              {Action}
            </div>
          </div>
  )
}

export default LayoutModal
