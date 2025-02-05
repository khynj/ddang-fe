import PropTypes from 'prop-types'
import MaterialIcon from '../icons/MaterialIcon'

function ModalItem({ children }) {
  return (
    <div className='flex grow items-center justify-between px-4 py-2'>
      <p className='text-sm'>{children}</p>
      <MaterialIcon name='chevron_right' className='text-gray-900' wght='300' />
    </div>
  )
}

ModalItem.propTypes = {
  children: PropTypes.node,
}

export default ModalItem
