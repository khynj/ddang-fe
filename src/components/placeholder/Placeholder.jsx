import PropTypes from 'prop-types'

function Placeholder({ children }) {
  return (
    <div className='flex items-center justify-center h-full w-full p-4 text-gray-800 text-lg'>
      {children}
    </div>
  )
}

Placeholder.propTypes = {
  children: PropTypes.node,
}

export default Placeholder
