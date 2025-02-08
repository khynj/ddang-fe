import PropTypes from 'prop-types'
import useModal from '../../hooks/useModal'
import Modal from './Modal'
import MaterialIcon from '../icons/MaterialIcon'
import InputValue from '../form/InputValue'
import PickerWrapper from '../form/PickerWrapper'
import { useEffect, useState } from 'react'
import Label from '../form/Label'
import InputError from '../form/InputError'
import ModalItem from './ModalItem'
import TextInput from '../form/TextInput'
import MY_LOCATIONS from '../../data/MY_LOCATIONS'
import FavoriteButton from '../icons/FavoriteButton'
import DefaultButton from '../buttons/DefaultButton'
import LOCATIONS from '../../data/LOCATIONS'

function DealLocationPicker({ label, required, value, setValue, validate }) {
  const { isOpen, open, close } = useModal(value)
  const [error, setError] = useState('')
  const onClose = v => {
    if (validate) {
      setError(validate(v))
    }
    setValue(v)
    close()
  }

  const [searchValue, setSearchValue] = useState('')
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {
    if (isOpen) {
      setSearchValue('')
    }
  }, [isOpen])
  useEffect(() => {
    if (!searchValue) {
      setSearchResult([])
    } else {
      setSearchResult(
        LOCATIONS.filter(location => location.includes(searchValue)).slice(
          0,
          8,
        ),
      )
    }
  }, [searchValue])

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
          <p className='text-sm text-center'>거래희망장소</p>
          <div className='w-full'>
            <TextInput
              icon={'search'}
              placeholder={'지번으로 검색'}
              value={searchValue}
              setValue={setSearchValue}
            />
          </div>
          {searchResult.length ? (
            searchResult.map((location, i) => (
              <div className='w-full' key={i} onClick={() => onClose(location)}>
                <ModalItem>
                  <p className='text-gray-600 text-sm'>{location}</p>
                </ModalItem>
              </div>
            ))
          ) : (
            <div className='w-full flex flex-col gap-4 mb-3'>
              {MY_LOCATIONS.map(location => (
                <div
                  className='w-full'
                  key={location.name}
                  onClick={() => onClose(location.address)}
                >
                  <ModalItem>
                    <div className='flex items-center gap-2'>
                      <FavoriteButton liked />
                      <p className='text-base'>{location.name}</p>
                    </div>
                  </ModalItem>
                  <p className='text-gray-600 text-sm'>{location.address}</p>
                </div>
              ))}
            </div>
          )}
          <DefaultButton type={'gray'} onClick={() => onClose(value)}>
            닫기
          </DefaultButton>
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
}

export default DealLocationPicker
