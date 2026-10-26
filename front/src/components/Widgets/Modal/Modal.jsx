import { useEffect } from 'react'

const Modal = ({
    showModal = false,
    Content
    }) => {
  useEffect(() => {
    if (!showModal) {
      document.body.classList.remove('modal-open')
      return
    }

    document.body.classList.add('modal-open')

    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [showModal])

  if (!showModal) {
    return null
  }

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          {Content}
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  )
}

export default Modal
