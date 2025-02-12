import PropTypes from 'prop-types'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import MaterialIcon from '../icons/MaterialIcon'
import InputValue from '../form/InputValue'
import { useCallback, useEffect, useState } from 'react'
import ModalItem from './ModalItem'
import DefaultButton from '../buttons/DefaultButton'
import { useCategory } from '@/apis/auction'
import { useSearchParams } from 'react-router'

function CategoryPickerSmall({ label, value, setValue, validate }) {
  const { isOpen, open, close } = useModal('')
  const [error, setError] = useState('')
  const [parentId, setParentId] = useState(0)
  const [searchParams] = useSearchParams()
  const categoryNameParam = searchParams.get('categoryName') || '카테고리'
  const [categoryName, setCategoryName] = useState(categoryNameParam)
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
      <button
        onClick={open}
        className='flex w-fit items-center pl-2 pr-1 mr-1
            text-gray-950 bg-gray-100 rounded-lg whitespace-nowrap'
      >
        <InputValue value={categoryName} label={label} />
        <MaterialIcon name='arrow_drop_down' size={18} />
      </button>
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
                } else {
                  setCategoryName(category.name)
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

CategoryPickerSmall.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.any,
  setValue: PropTypes.func,
  validate: PropTypes.func,
  children: PropTypes.node,
}

export default CategoryPickerSmall
