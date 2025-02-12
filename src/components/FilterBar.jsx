import PropTypes from 'prop-types'
import MaterialIcon from './icons/MaterialIcon'
import useModal from '../hooks/useModal'
import Modal from './modals/Modal'
import DefaultButton from './buttons/DefaultButton'

function FilterBar({ children, sortType = 'createdAt', setSortType }) {
  const options = [
    { key: 'createdAt', name: '최신순' },
    { key: 'endTime', name: '인기순' },
    { key: 'endTime', name: '마감임박' },
    { key: 'startTime', name: '시작임박' },
  ]

  const {
    isOpen,
    open,
    close,
    value: name,
  } = useModal(options.find(option => option.key === sortType).name)

  return (
    <div className='flex px-4 py-2 justify-between items-center text-xs'>
      <div className='flex gap-1 w-full h-7.5'>{children}</div>
      <div
        className='font-bold flex gap-0.5 items-center text-gray-950'
        onClick={open}
      >
        <MaterialIcon name='sort' size={16} />
        <div className='whitespace-nowrap'>{name}</div>
      </div>
      {isOpen && (
        <Modal close={close}>
          {options.map((option, index) => (
            <DefaultButton
              key={index}
              onClick={() => {
                setSortType(option.key)
                close(option.name)
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
  sortType: PropTypes.string,
  setSortType: PropTypes.func,
}

export default FilterBar
