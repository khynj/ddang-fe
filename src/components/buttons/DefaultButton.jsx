import PropTypes from 'prop-types'

function DefaultButton({ children, onClick, type, submit }) {
  return (
    <button
      className={`w-full p-3 rounded-xl ${
        type === 'gray'
          ? 'text-gray-700 bg-gray-100'
          : type === 'red'
          ? 'text-white bg-ddred-500'
          : type == 'disabled'
          ? 'text-gray-500 bg-gray-100'
          : 'text-white bg-ddblue-400'
      }`}
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
      disabled={type == 'disabled'}
    >
      {children}
    </button>
  )
}

DefaultButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.string,
  submit: PropTypes.bool,
}

export default DefaultButton
