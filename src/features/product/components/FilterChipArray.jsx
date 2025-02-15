import PropTypes from 'prop-types'
import MaterialIcon from '@/components/icons/MaterialIcon'
import useModal from '@/hooks/useModal'
import { useMemo } from 'react'
import Modal from '@/components/modals/Modal'
import DefaultButton from '@/components/buttons/DefaultButton'

function FilterChipArray({
  options,
  searchParams,
  setSearchParams,
  keyName,
  defaultName,
}) {
  const name = useMemo(() => {
    const v = options.find(v => v.value === searchParams.get(keyName))
    return v ? v.name : defaultName
  }, [options, searchParams, keyName, defaultName])

  const { isOpen, open, close } = useModal(name)

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
          <DefaultButton
            onClick={() => {
              setSearchParams(
                params => {
                  params.delete(keyName)
                  return params
                },
                { replace: true },
              )
              close()
            }}
            type='gray'
          >
            전체
          </DefaultButton>
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
  options: PropTypes.array.isRequired,
  searchParams: PropTypes.object.isRequired,
  setSearchParams: PropTypes.func.isRequired,
  keyName: PropTypes.string.isRequired,
  defaultName: PropTypes.string,
}

export default FilterChipArray
