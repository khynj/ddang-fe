import PropTypes from 'prop-types'
import useModal from '../../hooks/useModal'
import Modal from '../modals/Modal'
import MaterialIcon from '../icons/MaterialIcon'
import InputValue from './InputValue'
import PickerWrapper from './PickerWrapper'
import { useState } from 'react'
import Label from './Label'
import InputError from './InputError'

function ModalPicker({ label, required, value, setValue, validate, children }) {
  const { isOpen, open, close } = useModal(value)
  const [error, setError] = useState('')
  useState(() => {
    if (validate) {
      setError(validate(value))
    }
    setValue(value)
  }, [value])
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
        <Modal close={close}>
          <h1>{children}</h1>
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
}

export default ModalPicker
