import PropTypes from 'prop-types'
import MaterialIcon from '@/components/icons/MaterialIcon'
import { useDeletePreferredLocation } from '@/apis/member'
import { useQueryClient } from '@tanstack/react-query'

function LocationItem({ location }) {
  const queryClient = useQueryClient()
  const { mutate: deleteLocation } = useDeletePreferredLocation()

  return (
    <div className='flex justify-between items-center p-4 border-b border-gray-200'>
      <div>
        <p className='text-base mb-2'>{location.title}</p>
        <p className='text-sm text-gray-700'>{location.locationName}</p>
      </div>
      <button
        onClick={() => {
          if (!confirm('정말 삭제하시겠습니까?')) return
          deleteLocation(location.memberLocationId, {
            onSuccess: () => {
              queryClient.invalidateQueries('preferredLocations')
            },
          })
        }}
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
