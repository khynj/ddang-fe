import PropTypes from 'prop-types'
import Label from './Label'
import { useEffect, useState } from 'react'
import InputError from './InputError'
import MaterialIcon from '../icons/MaterialIcon'

function TextInput({
  label,
  required,
  type = 'text',
  validate,
  value,
  setValue,
  icon,
  placeholder,
  limit,
}) {
  const [hasFocused, setHasFocused] = useState(false)
  const [error, setError] = useState('')

  const onChange = e => {
    const val = e.target.value
    if (limit) {
      const error = limit(val)
      if (error) return setError(error)
    }

    if (validate) setError(validate(value))
    else setError('')
    setValue(val)
  }

  useEffect(() => {
    if (validate && hasFocused) {
      setError(validate(value))
    }
  }, [value, validate, hasFocused])

  const onBlur = () => {
    if (validate) setError(validate(value))
    else setError('')
  }

  return (
    <div className='flex flex-col gap-2 py-3 relative justify-center'>
      {label && (
        <Label text={label} required={required}>
          <InputError>{error}</InputError>
        </Label>
      )}
      <div
        className={`relative flex items-center w-full ${
          error ? 'invalid' : ''
        }`}
      >
        <input
          type={type}
          value={value}
          onChange={onChange}
          className={`flex border-1 border-gray-300 rounded-md p-3 w-full ${
            error ? 'invalid' : ''
          }`}
          placeholder={placeholder}
          onFocus={() => setHasFocused(true)}
          autoComplete='off'
          onBlur={onBlur}
        />
        {icon && (
          <MaterialIcon
            name={icon}
            size={20}
            className='text-gray-400 absolute right-3 z-2 pointer-events-none'
          />
        )}
      </div>
    </div>
  )
}

TextInput.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  validate: PropTypes.func,
  value: PropTypes.any,
  setValue: PropTypes.func,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
}

export default TextInput
