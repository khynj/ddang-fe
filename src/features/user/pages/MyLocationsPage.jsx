import { usePreferredLocations } from '@/apis/member'
import usePageName from '../../../hooks/usePageName'
import LocationItem from '../components/LocationItem'
// import myLocations from '../data/myLocations'

function MyLocationsPage() {
  usePageName('내 장소')

  const { data: myLocations } = usePreferredLocations()

  return (
    <div>
      <main className='overflow-y-auto'>
        {myLocations?.memberLocations.map(location => (
          <LocationItem key={location.memberLocationId} location={location} />
        ))}
      </main>
    </div>
  )
}

export default MyLocationsPage
