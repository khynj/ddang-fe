import { useNavigate } from 'react-router'
import { useMemo, useState } from 'react'
import usePageName from '../../../hooks/usePageName'
import MaterialIcon from '@/components/icons/MaterialIcon'
import useModal from '@/hooks/useModal'
import Modal from '@/components/modals/Modal'
import DefaultButton from '@/components/buttons/DefaultButton'
import ROUTES from '@/data/ROUTES'
import TextInput from '@/components/form/TextInput'
import { useLocations } from '@/apis/location'
import { useAddPreferredLocation } from '@/apis/member'
import InfiniteScrollWrapper from '@/components/InfiniteScrollWrapper'

function MyLocationsRegisterPage() {
  usePageName('내 장소')

  const route = useNavigate()

  const [searchKey, setSearchKey] = useState('')
  const [selectedLocationId, setSelectedLocationId] = useState('')
  const [selectedLocationName, setSelectedLocationName] = useState('')
  const [name, setName] = useState('')
  const { isOpen, open, close } = useModal()
  const [isConfirmed, setIsConfirmed] = useState(false)

  // const [searchedLocations, setSearchedLocations] = useState([])
  const searchParams = useMemo(() => ({ searchKey, size: 25 }), [searchKey])

  const {
    data: searchLocation,
    fetchNextPage,
    isPending,
  } = useLocations(searchParams)

  const { mutate: registerLocation } = useAddPreferredLocation()

  // useEffect(() => {
  //   if (!searchLocation) return
  //   if (page == 1) setSearchedLocations([...searchLocation.locations])
  //   else setSearchedLocations(prev => [...prev, ...searchLocation.locations])
  // }, [setSearchedLocations, searchLocation])

  // useEffect(() => {
  //   setPage(1)
  // }, [searchKey])

  const handleSearch = e => {
    setSearchKey(e.target.value)
  }

  const handleClick = location => {
    setSelectedLocationId(location.id)
    setSelectedLocationName(location.locationName)
    open()
  }

  const onConfirm = e => {
    e.preventDefault()
    registerLocation({ locationId: selectedLocationId, title: name })
    setIsConfirmed(true)
    close()
  }

  return (
    <div className='flex flex-col h-full'>
      <div className='w-full max-w-md bg-white p-4'>
        <div className='relative'>
          <input
            type='text'
            placeholder='지역을 입력하세요'
            value={searchKey}
            onChange={handleSearch}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-ddblue-300'
          />
          <div className='absolute inset-y-0 right-3 flex items-center pointer-events-none gray-600'>
            <MaterialIcon name='search' size={18} className='text-gray-600' />
          </div>
        </div>
      </div>

      <InfiniteScrollWrapper
        fetchNextPage={fetchNextPage}
        isPending={isPending}
      >
        {searchLocation?.pages.map(page =>
          page.locations.map((location, index) => (
            <button
              onClick={() => handleClick(location)}
              key={index}
              className={`px-6 py-4 border-b border-gray-300 text-start`}
            >
              {location.locationName}
            </button>
          )),
        )}
        {!searchLocation ||
          (searchLocation.pages.length === 0 && searchKey && (
            <p className='px-4 py-3 text-gray-500 text-center'>
              검색 결과가 없습니다.
            </p>
          ))}
      </InfiniteScrollWrapper>

      {isOpen && (
        <Modal close={close}>
          <form
            onSubmit={onConfirm}
            className='flex flex-col gap-4 w-full text-center'
          >
            <div className='flex flex-col gap-1'>
              <p className='font-bold text-ddblue-400'>내 장소 등록</p>
            </div>
            <p className='font-bold text-sm'>{selectedLocationName}</p>
            <TextInput required value={name} setValue={setName} />
            <div className='flex gap-4'>
              <DefaultButton type='gray' onClick={close}>
                닫기
              </DefaultButton>
              <DefaultButton submit>확인</DefaultButton>
            </div>
          </form>
        </Modal>
      )}

      {isConfirmed && (
        <Modal close={() => route(ROUTES.MY_LOCATIONS)}>
          <div className='flex flex-col gap-4 w-full text-center'>
            <div className='flex flex-col gap-1'>
              <MaterialIcon
                name='check_circle'
                filled
                size={26}
                className='text-ddblue-400'
              />
              <p className='font-bold text-ddblue-400'>등록되었습니다.</p>
            </div>
            <p className='font-bold'>{name}</p>
            <div className='flex gap-4'>
              <DefaultButton
                onClick={() => route(ROUTES.MY_LOCATIONS, { replace: true })}
              >
                확인
              </DefaultButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default MyLocationsRegisterPage
