import PropTypes from 'prop-types'
import BeatLoader from 'react-spinners/BeatLoader'

function InlineSpinner({ loading = true }) {
  return (
    <div className='flex grow p-6 justify-center items-center'>
      <BeatLoader color='#4d86f9' loading={loading} />
    </div>
  )
}

InlineSpinner.propTypes = {
  loading: PropTypes.bool,
}

export default InlineSpinner
