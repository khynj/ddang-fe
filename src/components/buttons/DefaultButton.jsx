import PropTypes from 'prop-types'

function DefaultButton({ children, onClick, type }) {
  return (
    <button
      className={`w-full p-3 rounded-xl ${
        type === 'gray'
          ? 'text-gray-700 bg-gray-100'
          : type === 'red'
          ? 'text-white bg-ddred-500'
          : 'text-white bg-ddblue-400'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

DefaultButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.string,
}

export default DefaultButton
