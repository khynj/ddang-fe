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
import DefaultButton from '../buttons/DefaultButton'
import { useCategory } from '@/apis/auction'

function CategoryPicker({
  label,
  required,
  value,
  setValue,
  validate,
  initialCategoryName,
}) {
  const { isOpen, open, close } = useModal('')
  const [error, setError] = useState('')
  const [parentId, setParentId] = useState(0)
  const [categoryName, setCategoryName] = useState(initialCategoryName)
  const { data: categories } = useCategory(parentId)

  useEffect(() => {
    if (isOpen) {
      setParentId(0)
    }
  }, [isOpen])

  const onClose = useCallback(
    v => {
      if (validate) setError(validate(v))
      setValue(v)
      close()
    },
    [validate, setValue, close],
  )

  return (
    <>
      <div className='flex flex-col gap-2 py-3'>
        {label && (
          <Label text={label} required={required}>
            {error && <InputError>{error}</InputError>}
          </Label>
        )}
        <PickerWrapper onClick={open}>
          <InputValue value={categoryName} label={label} />
          <MaterialIcon name='chevron_right' className='text-gray-600' />
        </PickerWrapper>
      </div>
      {isOpen && (
        <Modal close={() => onClose(value)}>
          <p className='text-sm text-center'>카테고리</p>
          {categories?.map(category => (
            <div
              className='w-full'
              key={category.categoryId}
              onClick={() => {
                if (category.categoryId <= 99) {
                  setParentId(category.categoryId)
                  setCategoryName(category.name)
                } else {
                  setCategoryName(categoryName + ' > ' + category.name)
                  onClose(category.categoryId)
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
  initialCategoryName: PropTypes.string,
}

export default CategoryPicker
