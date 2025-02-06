import usePageName from '../../../hooks/usePageName'
import LocationItem from '../components/LocationItem'
import myLocations from '../data/myLocations'

function MyLocationsPage() {
  usePageName('내 장소')

  const handleDelete = id => {
    console.log(`Delete location with id: ${id}`)
  }

  return (
    <div className='max-w-md mx-auto bg-white h-screen'>
      <main className='overflow-y-auto'>
        {myLocations.map(location => (
          <LocationItem
            key={location.id}
            name={location.name}
            address={location.address}
            onDelete={() => handleDelete(location.id)}
          />
        ))}
      </main>
    </div>
  )
}

export default MyLocationsPage
