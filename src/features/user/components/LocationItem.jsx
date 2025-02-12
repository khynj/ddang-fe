import PropTypes from 'prop-types'
import MaterialIcon from '@/components/icons/MaterialIcon'
import { useDeletePreferredLocation } from '@/apis/member'

function LocationItem({ location }) {
  const deleteLocation = useDeletePreferredLocation().mutate

  return (
    <div className='flex justify-between items-center p-4 border-b border-gray-200'>
      <div>
        <p className='text-base mb-2'>{location.title}</p>
        <p className='text-sm text-gray-700'>{location.locationName}</p>
      </div>
      <button
        onClick={() => deleteLocation(location.memberLocationId)}
        className='p-2 text-gray-600'
      >
        <MaterialIcon name='close' filled>
          close
        </MaterialIcon>
      </button>
    </div>
  )
}

LocationItem.propTypes = {
  location: PropTypes.object.isRequired,
}

export default LocationItem
