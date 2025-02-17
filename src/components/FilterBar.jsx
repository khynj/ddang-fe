import PropTypes from 'prop-types'
import MaterialIcon from './icons/MaterialIcon'
import Modal from './modals/Modal'
import DefaultButton from './buttons/DefaultButton'
import { useMemo, useState } from 'react'

const options = [
  { value: 'createdAt', name: '최신순' },
  // { value: 'endTime', name: '인기순' },
  { value: 'endTime', name: '마감시간순' },
  { value: 'startTime', name: '시작시간순' },
]
function FilterBar({ children, keyName, searchParams, setSearchParams }) {
  const name = useMemo(
    () => options.find(v => v.value === searchParams.get(keyName))?.name,
    [searchParams, keyName],
  )

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='flex px-4 py-2 justify-between items-center text-xs'>
      <div className='flex gap-1 w-full h-7.5'>{children}</div>
      <div
        className='font-bold flex gap-0.5 items-center text-gray-950'
        onClick={() => setIsOpen(true)}
      >
        <MaterialIcon name='sort' size={16} />
        <div className='whitespace-nowrap'>{name}</div>
      </div>
      {isOpen && (
        <Modal close={() => setIsOpen(false)}>
          {options.map((option, index) => (
            <DefaultButton
              key={index}
              onClick={() => {
                setSearchParams(
                  params => {
                    params.set(keyName, option.value)
                    return params
                  },
                  { replace: true },
                )
                setIsOpen(false)
              }}
              type={option.name == name ? undefined : 'gray'}
            >
              {option.name}
            </DefaultButton>
          ))}
        </Modal>
      )}
    </div>
  )
}

FilterBar.propTypes = {
  children: PropTypes.node,
  keyName: PropTypes.string,
  searchParams: PropTypes.object,
  setSearchParams: PropTypes.func,
}

export default FilterBar
