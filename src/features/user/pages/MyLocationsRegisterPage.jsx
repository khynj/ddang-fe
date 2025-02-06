import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import usePageName from '../../../hooks/usePageName'
import MaterialIcon from '@/components/icons/MaterialIcon'
import useModal from '@/hooks/useModal'
import Modal from '@/components/modals/Modal'
import DefaultButton from '@/components/buttons/DefaultButton'
import ROUTES from '@/data/ROUTES'
import TextInput from '@/components/form/TextInput'

function MyLocationsRegisterPage() {
  usePageName('내 장소')

  const data = [
    '서울시 강남구 역삼동',
    '서울시 강남구 논현동',
    '서울시 강남구 대치동',
    '서울시 강남구 삼성동',
    '서울시 강남구 신사동',
    '서울시 강남구 청담동',
  ]

  const route = useNavigate()

  const [searchTerm, setSearchTerm] = useState('')
  const [filteredResults, setFilteredResults] = useState([])
  const [address, setAddress] = useState('')
  const [name, setName] = useState('')
  const { isOpen, open, close } = useModal()
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleSearch = e => {
    const term = e.target.value
    setSearchTerm(term)

    if (term) {
      const results = data.filter(item => item.includes(term))
      setFilteredResults(results)
    } else {
      setFilteredResults([])
    }
  }

  const handleClick = address => {
    setAddress(address)
    open()
  }

  const onConfirm = () => {
    console.log('Confirm')
    setIsConfirmed(true)
    close()
  }

  return (
    <>
      <div className='min-h-screen bg-white flex flex-col items-center'>
        <div className='w-full max-w-md bg-white p-4'>
          <div className='relative'>
            <input
              type='text'
              placeholder='지역을 입력하세요'
              value={searchTerm}
              onChange={handleSearch}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-ddblue-300'
            />
            <div className='absolute inset-y-0 right-3 flex items-center pointer-events-none gray-600'>
              <MaterialIcon name='search' size={18} className='text-gray-600' />
            </div>
          </div>
        </div>

        <div className='flex-1 w-full max-w-md mt-2 overflow-y-auto'>
          <ul className='bg-white divide-y divide-gray-300'>
            {filteredResults.map((result, index) => (
              <li
                onClick={() => handleClick(result)}
                key={index}
                className={`px-4 py-3 cursor-pointer ${
                  index === 0 ? 'border-t border-gray-300' : ''
                } ${
                  index === filteredResults.length - 1
                    ? 'border-b border-gray-300'
                    : ''
                }`}
              >
                {result}
              </li>
            ))}
            {filteredResults.length === 0 && searchTerm && (
              <li className='px-4 py-3 text-gray-500 text-center'>
                검색 결과가 없습니다.
              </li>
            )}
          </ul>
        </div>
      </div>
      {isOpen && (
        <Modal close={close}>
          <div className='flex flex-col gap-4 w-full text-center'>
            <div className='flex flex-col gap-1'>
              <p className='font-bold text-sm'>{address}</p>
              <p className='font-bold text-ddblue-400'>내 장소 등록</p>
            </div>
            <TextInput required value={name} setValue={setName} />
            <div className='flex gap-4'>
              <DefaultButton type='gray' onClick={close}>
                닫기
              </DefaultButton>
              <DefaultButton onClick={onConfirm}>확인</DefaultButton>
            </div>
          </div>
        </Modal>
      )}
      {isConfirmed && (
        <Modal close={() => route(ROUTES.MY_LOCATIONS)}>
          <div className='flex flex-col gap-4 w-full text-center'>
            <div className='flex flex-col gap-1'>
              <p className='font-bold text-sm'>{address}</p>
              <p className='font-bold text-ddblue-400'>등록되었습니다.</p>
            </div>
            <div className='flex gap-4'>
              <DefaultButton onClick={() => route(ROUTES.MY_LOCATIONS)}>
                확인
              </DefaultButton>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default MyLocationsRegisterPage
