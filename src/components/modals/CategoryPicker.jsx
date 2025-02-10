import PropTypes from 'prop-types'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import MaterialIcon from '../icons/MaterialIcon'
import InputValue from '../form/InputValue'
import PickerWrapper from '../form/PickerWrapper'
import { useCallback, useEffect, useState } from 'react'
import Label from '../form/Label'
import InputError from '../form/InputError'
import ModalItem from './ModalItem'
import CATEGORIES from '@/features/product/data/categories'
import DefaultButton from '../buttons/DefaultButton'

function CategoryPicker({ label, required, value, setValue, validate }) {
  const { isOpen, open, close } = useModal('')
  const [error, setError] = useState('')
  const onClose = useCallback(
    v => {
      if (validate) setError(validate(v))
      setValue(v)
      close()
    },
    [validate, setValue, close],
  )

  const [firstCategory, setFirstCategory] = useState('')
  const [secondCategory, setSecondCategory] = useState('')
  const [categories, setCategories] = useState(CATEGORIES)

  useEffect(() => {
    if (isOpen) {
      setFirstCategory('')
      setSecondCategory('')
      setCategories(CATEGORIES)
    }
  }, [isOpen])

  useEffect(() => {
    if (firstCategory && secondCategory) {
      setValue(`${firstCategory} > ${secondCategory}`)
    }
  }, [firstCategory, secondCategory, setValue])

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
          <p className='text-sm text-center'>카테고리</p>
          {categories.map(category => (
            <div
              className='w-full'
              key={category.id}
              onClick={() => {
                if (category.subcategories) {
                  setFirstCategory(category.name)
                  setCategories(category.subcategories)
                } else {
                  setSecondCategory(category.name)
                  onClose(`${firstCategory} > ${category.name}`)
                }
              }}
            >
              <ModalItem type={'gray'}>{category.name}</ModalItem>
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

CategoryPicker.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.any,
  setValue: PropTypes.func,
  validate: PropTypes.func,
  children: PropTypes.node,
}

export default CategoryPicker
