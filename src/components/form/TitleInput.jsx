import PropTypes from 'prop-types'
import Label from './Label'
import { useEffect, useState } from 'react'
import InputError from './InputError'
import MaterialIcon from '../icons/MaterialIcon'

function TitleInput({
  label,
  required,
  type = 'text',
  validate,
  value,
  icon,
  placeholder,
  onChange,
}) {
  const [hasFocused, setHasFocused] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (validate && hasFocused) {
      setError(validate(value))
    }
  }, [value, validate, hasFocused])
  return (
    <div className='flex flex-col gap-2 py-3 relative justify-center'>
      {label && (
        <Label text={label} required={required}>
          <InputError>{error}</InputError>
        </Label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onChange}
        className={`flex border-1 border-gray-300 rounded-md p-3 ${
          error ? 'invalid' : ''
        }`}
        placeholder={placeholder}
        onFocus={() => setHasFocused(true)}
      ></input>
      {icon && (
        <MaterialIcon name={icon} className='text-gray-600 absolute right-3' />
      )}
    </div>
  )
}

TitleInput.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  validate: PropTypes.func,
  value: PropTypes.any,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
}

export default TitleInput
