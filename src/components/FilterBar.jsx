import PropTypes from 'prop-types'
import MaterialIcon from './icons/MaterialIcon'
import useModal from '../hooks/useModal'
import Modal from './modals/Modal'
import DefaultButton from './buttons/DefaultButton'

function FilterBar({ children }) {
  const { isOpen, open, close, value } = useModal('최신순')
  const options = ['최신순', '인기순', '마감임박']
  return (
    <div className='flex px-4 pt-3 pb-2 justify-between items-center'>
      <div className='flex gap-1 h-8'>{children}</div>
      <div
        className='font-bold text-sm flex gap-1 items-center text-gray-950'
        onClick={open}
      >
        <MaterialIcon name='sort' size={18} />
        <div>{value}</div>
      </div>
      {isOpen && (
        <Modal close={close}>
          {options.map((option, index) => (
            <DefaultButton
              key={index}
              onClick={() => close(option)}
              type={option == value ? undefined : 'gray'}
            >
              {option}
            </DefaultButton>
          ))}
        </Modal>
      )}
    </div>
  )
}

FilterBar.propTypes = {
  children: PropTypes.node,
}

export default FilterBar
