import PropTypes from 'prop-types'
import MaterialIcon from '@/components/icons/MaterialIcon'
import useModal from '@/hooks/useModal'

function FilterChipArray({ values, value, setValue }) {
  const {
    isOpen,
    open,
    close,
    value: name,
  } = useModal(values.find(option => option.key === value)?.name)

  return (
    <div
      className='flex w-fit items-center pl-2 pr-2 mr-1.5
    text-gray-950 text-sm bg-gray-100 rounded-lg whitespace-nowrap'
    >
      {value}
      <MaterialIcon name='arrow_drop_down' size={20} />
    </div>
  )
}

FilterChipArray.propTypes = {
  values: PropTypes.array.isRequired,
}

export default FilterChipArray
