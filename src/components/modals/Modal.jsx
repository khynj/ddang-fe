import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'
function Modal({ children, close }) {
  return (
    <>
      {createPortal(
        <div
          className={`m-auto fixed inset-0 p-4 z-4 max-w-lg w-full h-full flex flex-col-reverse items-center`}
        >
          <div
            className='z-4 m-auto fixed inset-0 max-w-lg bg-black opacity-25'
            onClick={() => close()}
          ></div>
          <div className='max-w-lg w-full max-h-full overflow-y-scroll flex flex-col gap-4 items-center bg-white z-4 py-4 px-6 mx-auto rounded-2xl'>
            <div className='w-8 h-1 bg-gray-300 rounded-xs mb-0.5'></div>
            {children}
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  close: PropTypes.func,
}

export default Modal
