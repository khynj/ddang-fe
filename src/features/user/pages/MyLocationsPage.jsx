import usePageName from '../../../hooks/usePageName'
import LocationItem from '../components/LocationItem'

function MyLocations() {
  usePageName('내 장소')

  const locations = [
    { id: 1, name: '서울 울집', address: '서울 강남구 역삼동' },
    { id: 2, name: '서울 울집', address: '서울 강남구 역삼동' },
    { id: 3, name: '서울 울집', address: '서울 강남구 역삼동' },
    { id: 4, name: '서울 울집', address: '서울 강남구 역삼동' },
    { id: 5, name: '서울 울집', address: '서울 강남구 역삼동' },
    { id: 6, name: '서울 울집', address: '서울 강남구 역삼동' },
  ]

  const handleDelete = id => {
    console.log(`Delete location with id: ${id}`)
  }

  return (
    <div className='max-w-md mx-auto bg-white h-screen'>
      <main className='overflow-y-auto'>
        {locations.map(location => (
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

export default MyLocations
