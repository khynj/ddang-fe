import PropTypes from 'prop-types'
import useModal from '../../hooks/useModal'
import Modal from '../modals/Modal'
import MaterialIcon from '../icons/MaterialIcon'
import InputValue from './InputValue'
import PickerWrapper from './PickerWrapper'
import { useState } from 'react'
import Label from './Label'
import InputError from './InputError'
import DefaultButton from '../buttons/DefaultButton'

function ModalPicker({ label, required, value, setValue, validate, options }) {
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
          <MaterialIcon name='chevron_right' />
        </PickerWrapper>
      </div>
      {isOpen && (
        <Modal close={() => onClose(value)}>
          {options.map(option => (
            <DefaultButton
              key={option.id}
              type={'gray'}
              onClick={() => onClose(option.value)}
            >
              {option.value}
            </DefaultButton>
          ))}
        </Modal>
      )}
    </>
  )
}

ModalPicker.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.any,
  setValue: PropTypes.func,
  validate: PropTypes.func,
  children: PropTypes.node,
  options: PropTypes.array,
}

export default ModalPicker
