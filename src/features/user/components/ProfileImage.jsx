import PropTypes from 'prop-types'

function ProfileImage({ src, size }) {
  return (
    // image wrapper
    <div
      className={`flex items-center justify-center aspect-square
         rounded-full bg-gray-200 overflow-hidden`}
      style={{ width: `${size}px` }}
    >
      <img src={src} className={`object-cover w-full h-full`} />
    </div>
  )
}

ProfileImage.propTypes = {
  src: PropTypes.string,
  size: PropTypes.number,
}

export default ProfileImage
