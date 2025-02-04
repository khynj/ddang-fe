import PropTypes from 'prop-types'

function InputError({ children }) {
  return (
    <span className='w-full font-normal tracking-tighter text-sm text-ddred-500 leading-none ml-1'>
      {children}
    </span>
  )
}

InputError.propTypes = {
  children: PropTypes.node,
}
export default InputError
