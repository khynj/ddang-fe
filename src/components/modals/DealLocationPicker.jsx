import PropTypes from 'prop-types'
import useModal from '../../hooks/useModal'
import Modal from './Modal'
import MaterialIcon from '../icons/MaterialIcon'
import InputValue from '../form/InputValue'
import PickerWrapper from '../form/PickerWrapper'
import { useState } from 'react'
import Label from '../form/Label'
import InputError from '../form/InputError'
import ModalItem from './ModalItem'

function DealLocationPicker({
  label,
  required,
  value,
  setValue,
  validate,
  options,
}) {
  const { isOpen, open, close } = useModal(value)
  const [error, setError] = useState('')
  const onClose = v => {
    if (validate) {
      setError(validate(v))
    }
    setValue(v)
    close()
  }
  return (
    <>
      <div className='flex flex-col gap-2 py-3'>
        {label && (
          <Label text={label} required={required}>
            {error && <InputError>{error}</InputError>}
          </Label>
        )}
        <PickerWrapper onClick={open}>
          <InputValue value={value} label={label} />
          <MaterialIcon name='chevron_right' className='text-gray-600' />
        </PickerWrapper>
      </div>
      {isOpen && (
        <Modal close={() => onClose(value)}>
          {options.map(option => (
            <div
              className='w-full'
              key={option.id}
              onClick={() => onClose(option.value)}
            >
              <ModalItem type={'gray'}>{option.value}</ModalItem>
            </div>
          ))}
        </Modal>
      )}
    </>
  )
}

DealLocationPicker.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.any,
  setValue: PropTypes.func,
  validate: PropTypes.func,
  children: PropTypes.node,
  options: PropTypes.array,
}

export default DealLocationPicker
