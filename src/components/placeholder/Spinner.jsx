import PropTypes from 'prop-types'
import BeatLoader from 'react-spinners/BeatLoader'

function Spinner({ loading = true }) {
  return (
    <div
      className='m-auto fixed inset-0 max-w-lg z-25 flex justify-center items-center'
      onClick={e => {
        e.preventDefault()
      }}
    >
      <div
        className='z-4 m-auto fixed inset-0 max-w-lg bg-white opacity-40'
        onClick={() => close()}
      ></div>
      <BeatLoader color='#4d86f9' size={28} loading={loading} />
    </div>
  )
}

Spinner.propTypes = {
  loading: PropTypes.bool,
}

export default Spinner
