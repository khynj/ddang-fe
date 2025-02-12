import PropTypes from 'prop-types'
import MaterialIcon from '@/components/icons/MaterialIcon'
import useModal from '@/hooks/useModal'
import { useMemo } from 'react'
import Modal from '@/components/modals/Modal'
import DefaultButton from '@/components/buttons/DefaultButton'

function FilterChipArray({ values, value, setValue }) {
  const name = useMemo(
    () => values.find(v => v.value === value)?.name,
    [value, values],
  )

  const { isOpen, open, close, value: modalValue } = useModal(value)

  return (
    <>
      <button
        onClick={open}
        className='flex w-fit items-center pl-2 pr-1 mr-1
    text-gray-950 bg-gray-100 rounded-lg whitespace-nowrap'
      >
        {name}
        <MaterialIcon name='arrow_drop_down' size={18} />
      </button>
      {isOpen && (
        <Modal close={close}>
          {values.map((option, index) => (
            <DefaultButton
              key={index}
              onClick={() => {
                setValue(option.value)
                close(option.name)
              }}
              type={option.name == name ? undefined : 'gray'}
            >
              {option.name}
            </DefaultButton>
          ))}
        </Modal>
      )}
    </>
  )
}

FilterChipArray.propTypes = {
  values: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
}

export default FilterChipArray
