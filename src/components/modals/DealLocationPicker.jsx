import PropTypes from 'prop-types'
import useModal from '../../hooks/useModal'
import Modal from './Modal'
import MaterialIcon from '../icons/MaterialIcon'
import InputValue from '../form/InputValue'
import PickerWrapper from '../form/PickerWrapper'
import { useEffect, useMemo, useState } from 'react'
import Label from '../form/Label'
import InputError from '../form/InputError'
import ModalItem from './ModalItem'
import TextInput from '../form/TextInput'
import FavoriteButton from '../icons/FavoriteButton'
import DefaultButton from '../buttons/DefaultButton'
import { usePreferredLocations } from '@/apis/member'
import { useLocations } from '@/apis/location'

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

  const [searchKey, setSearchKey] = useState('')
  const { data: myLocations } = usePreferredLocations()
  const searchParams = useMemo(() => ({ searchKey, size: 25 }), [searchKey])

  const {
    data: searchLocation,
    fetchNextPage,
    isPending,
  } = useLocations(searchParams)
  console.log(searchLocation)

  useEffect(() => {
    if (isOpen) {
      setSearchKey('')
    }
  }, [isOpen])

  const onClick = () => {
    console.log('click')
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
        <input type='hidden' className={`${error ? 'invalid' : ''}`} />
      </div>
      {isOpen && (
        <Modal close={() => onClose(value)}>
          <p className='text-sm text-center'>거래희망장소</p>
          <div className='w-full'>
            <TextInput
              icon={'search'}
              placeholder={'지번으로 검색'}
              value={searchKey}
              setValue={setSearchKey}
            />
          </div>
          {searchKey ? (
            searchLocation?.pages.map(page =>
              page.locations.map((location, i) => (
                <div
                  className='w-full px-2'
                  key={i}
                  onClick={() => onClose(location.locationName)}
                >
                  <ModalItem>
                    <p className='text-gray-600 text-sm'>
                      {location.locationName}
                    </p>
                  </ModalItem>
                </div>
              )),
            )
          ) : (
            <div className='w-full flex flex-col gap-4 mb-3'>
              {myLocations?.memberLocations.map(location => (
                <div
                  className='w-full'
                  key={location.name}
                  onClick={() => onClose(location.locationName)}
                >
                  <ModalItem>
                    <div className='flex items-center gap-2'>
                      <FavoriteButton liked onClick={onClick} />
                      <p className='text-base'>{location.title}</p>
                    </div>
                  </ModalItem>
                  <p className='text-gray-600 text-sm'>
                    {location.locationName}
                  </p>
                </div>
              ))}
            </div>
          )}
          <hr className='border-0 pt-1' />
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
