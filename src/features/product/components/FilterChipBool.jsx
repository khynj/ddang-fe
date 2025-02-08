import PropTypes from 'prop-types'

function FilterChipBool({ text, value, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`flex w-fit items-center px-2.5 mr-2 text-sm ${
        value
          ? 'font-bold text-white bg-ddblue-400'
          : 'bg-gray-100 text-gray-950'
      } rounded-lg whitespace-nowrap`}
    >
      {text}
    </button>
  )
}

FilterChipBool.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default FilterChipBool
