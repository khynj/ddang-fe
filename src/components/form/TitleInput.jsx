import PropTypes from 'prop-types'
import Label from './Label'
import { useState } from 'react'
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
  limit,
}) {
  const [error, setError] = useState('')

  const onChangeHandler = e => {
    const val = e.target.value
    if (limit) {
      const error = limit(val)
      if (error) return setError(error)
    }
    if (validate) setError(validate(value))
    else setError('')
    onChange(val)
  }

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
        onChange={onChangeHandler}
        onBlur={onChangeHandler}
        className={`flex border-1 border-gray-300 rounded-md p-3 ${
          error ? 'invalid' : ''
        }`}
        placeholder={placeholder}
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
  limit: PropTypes.func,
}

export default TitleInput
