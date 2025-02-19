import PropTypes from 'prop-types'
import MaterialIcon from '@/components/icons/MaterialIcon'

function RegisteredImage({ src, deleteFunc, isLink = false }) {
  return (
    <div className='relative w-[18%] flex items-center justify-center '>
      <div className='flex items-center justify-center w-full aspect-square overflow-hidden rounded-lg bg-gray-100'>
        <img
          src={isLink ? src : URL.createObjectURL(src)}
          alt='preview'
          className='object-cover'
        />
      </div>
      <button
        onClick={deleteFunc}
        className='absolute translate-x-1/1 -translate-y-1/1
        flex p-0.5 bg-gray-100 rounded-full border border-gray-600'
      >
        <MaterialIcon name='close' size={18} className={'text-gray-600'} />
      </button>
    </div>
  )
}

RegisteredImage.propTypes = {
  src: PropTypes.string,
  deleteFunc: PropTypes.func,
  isLink: PropTypes.bool,
}

export default RegisteredImage
