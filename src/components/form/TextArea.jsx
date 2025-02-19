import PropTypes from 'prop-types'
import Label from './Label'
import { useState } from 'react'
import InputError from './InputError'

function TextArea({ label, required, value, setValue, validate, rows, limit }) {
  const [error, setError] = useState('')
  const onChange = e => {
    const val = e.target.value

    if (limit) {
      const error = limit(val)
      if (error) return setError(error)
    }
    if (validate) {
      setError(validate(val))
    }
    setValue(val)
  }
  return (
    <div className='flex flex-col gap-1 py-3'>
      {label && (
        <Label text={label} required={required}>
          <InputError>{error}</InputError>
        </Label>
      )}
      <textarea
        rows={rows}
        value={value}
        onChange={onChange}
        className={`flex border-1 border-gray-300 rounded-md p-1.5 ${
          error && 'invalid'
        }`}
      />
    </div>
  )
}

TextArea.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  setValue: PropTypes.func,
  validate: PropTypes.func,
  rows: PropTypes.number,
}

export default TextArea
