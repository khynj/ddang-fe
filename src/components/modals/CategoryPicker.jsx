import PropTypes from 'prop-types'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import MaterialIcon from '../icons/MaterialIcon'
import InputValue from '../form/InputValue'
import PickerWrapper from '../form/PickerWrapper'
import { useState } from 'react'
import Label from '../form/Label'
import InputError from '../form/InputError'
import ModalItem from './ModalItem'
import categories from '@/features/product/data/categories'

function CategoryPicker({ label, required, value, setValue, validate }) {
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
          <p className='py-1 text-sm text-center'>카테고리</p>
          {categories.map(category => (
            <div
              className='w-full'
              key={category.id}
              onClick={() => onClose(category.name)}
            >
              <ModalItem type={'gray'}>{category.name}</ModalItem>
            </div>
          ))}
        </Modal>
      )}
    </>
  )
}

CategoryPicker.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.any,
  setValue: PropTypes.func,
  validate: PropTypes.func,
  children: PropTypes.node,
}

export default CategoryPicker
