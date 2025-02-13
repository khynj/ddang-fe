import PropTypes from 'prop-types'
import Modal from './Modal'
import MaterialIcon from '../icons/MaterialIcon'
import InputValue from '../form/InputValue'
import { useEffect, useState } from 'react'
import ModalItem from './ModalItem'
import DefaultButton from '../buttons/DefaultButton'
import { useCategory } from '@/apis/auction'

const key = 'categoryId'
function CategoryPickerSmall({ searchParams, setSearchParams }) {
  const [isOpen, setIsOpen] = useState(false)
  const [parentId, setParentId] = useState(0)
  const [categoryName, setCategoryName] = useState('카테고리')
  const { data: categories } = useCategory(parentId)

  useEffect(() => {
    const name = searchParams.get('categoryName')
    if (name !== null) {
      setCategoryName(name)
    }
  }, [searchParams])

  useEffect(() => {
    if (isOpen) setParentId(0)
  }, [isOpen])

  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)

  return (
    <>
      <button
        onClick={open}
        className='flex w-fit items-center pl-2 pr-1 mr-1
            text-gray-950 bg-gray-100 rounded-lg whitespace-nowrap'
      >
        <InputValue value={categoryName} />
        <MaterialIcon name='arrow_drop_down' size={18} />
      </button>
      {isOpen && (
        <Modal close={close}>
          <p className='text-sm text-center'>카테고리</p>
          {!parentId && (
            <button
              className='w-full'
              onClick={() => {
                setCategoryName('카테고리')
                setSearchParams(
                  params => {
                    searchParams.delete(key)
                    searchParams.delete('categoryName')
                    return params
                  },
                  { replace: true },
                )
                close()
              }}
            >
              <ModalItem type={'gray'}>전체</ModalItem>
            </button>
          )}
          {categories?.map(category => (
            <button
              className='w-full'
              key={category.categoryId}
              onClick={() => {
                if (category.categoryId < 100) {
                  setParentId(category.categoryId)
                } else {
                  setCategoryName(category.name)
                  setSearchParams(
                    params => {
                      params.set(key, category.categoryId)
                      params.set('categoryName', category.name)
                      return params
                    },
                    { replace: true },
                  )
                  close()
                }
              }}
            >
              <ModalItem type={'gray'}>{category.name}</ModalItem>
            </button>
          ))}
          <DefaultButton type={'gray'} onClick={close}>
            닫기
          </DefaultButton>
        </Modal>
      )}
    </>
  )
}

CategoryPickerSmall.propTypes = {
  searchParams: PropTypes.object.isRequired,
  setSearchParams: PropTypes.func.isRequired,
}

export default CategoryPickerSmall
