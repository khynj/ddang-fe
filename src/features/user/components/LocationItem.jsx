import PropTypes from 'prop-types'
import MaterialIcon from '@/components/icons/MaterialIcon'

function LocationItem({ name, address, onDelete }) {
  return (
    <div className='flex justify-between items-center p-4 border-b border-gray-200'>
      <div>
        <p className='text-base mb-2'>{name}</p>
        <p className='text-sm text-gray-700'>{address}</p>
      </div>
      <button onClick={onDelete} className='p-2 text-gray-600'>
        <MaterialIcon name='close' filled>
          close
        </MaterialIcon>
      </button>
    </div>
  )
}

LocationItem.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default LocationItem
