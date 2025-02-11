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
import DEAL_TYPES from '../../data/DEAL_TYPES'
import DefaultButton from '../buttons/DefaultButton'

function DealTypePicker({ label, required, value, setValue, validate }) {
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
          <p className='text-sm text-center'>거래 유형</p>
          {DEAL_TYPES.map(dealType => (
            <div
              className='w-full'
              key={dealType.value}
              onClick={() => onClose({ ...dealType })}
            >
              <ModalItem type={'gray'}>{dealType.value}</ModalItem>
            </div>
          ))}
          <DefaultButton type={'gray'} onClick={() => onClose(value)}>
            닫기
          </DefaultButton>
        </Modal>
      )}
    </>
  )
}

DealTypePicker.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.any,
  setValue: PropTypes.func,
  validate: PropTypes.func,
  children: PropTypes.node,
}

export default DealTypePicker
