import { usePreferredLocations } from '@/apis/member'
import usePageName from '../../../hooks/usePageName'
import LocationItem from '../components/LocationItem'
import Placeholder from '@/components/placeholder/Placeholder'
import Spinner from '@/components/placeholder/Spinner'
// import myLocations from '../data/myLocations'

function MyLocationsPage() {
  usePageName('내 장소')

  const { data: myLocations } = usePreferredLocations()
  if (!myLocations) return <Spinner />
  return (
    <>
      {myLocations.memberLocations.length > 0 ? (
        myLocations.memberLocations.map(location => (
          <LocationItem key={location.memberLocationId} location={location} />
        ))
      ) : (
        <Placeholder>저장된 장소가 없어요.</Placeholder>
      )}
    </>
  )
}

export default MyLocationsPage
