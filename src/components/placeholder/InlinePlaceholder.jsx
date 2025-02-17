import PropTypes from 'prop-types'

function InlinePlaceholder({ children }) {
  return (
    <div className='flex items-center justify-center w-full p-2 text-gray-600 text-sm'>
      {children}
    </div>
  )
}

InlinePlaceholder.propTypes = {
  children: PropTypes.node,
}

export default InlinePlaceholder
