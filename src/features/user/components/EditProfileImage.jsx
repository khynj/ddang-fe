import PropTypes from 'prop-types'
import MaterialIcon from '@/components/icons/MaterialIcon'
import { useRef, useState } from 'react'
import profileImage from '@/assets/images/characters/profileImage.png'

function EditProfileImage({ src, setBlob, size, setIsChanged }) {
  const inputRef = useRef(null)
  const [imageUrl, setImageUrl] = useState(src)

  const selectImage = () => {
    inputRef.current.click()
  }

  return (
    <button onClick={selectImage} className='flex justify-center items-center'>
      <div
        className='relative rounded-full bg-gray-100 overflow-hidden aspect-square'
        style={{ width: size, height: size }}
      >
        <img
          src={imageUrl || profileImage}
          alt='EditProfileImage'
          className='object-cover w-full h-full'
        />

        <div
          className='absolute bottom-0 left-0 w-full flex justify-center items-center'
          style={{
            height: '30%',
            backgroundColor: 'rgba(209, 213, 219, 0.7)',
          }}
        >
          <MaterialIcon name='edit' filled className='text-ddblue-500' />
        </div>
      </div>
      <input
        ref={inputRef}
        className='hidden'
        type='file'
        accept='image/*'
        onChange={e => {
          const files = e.target.files
          setBlob(files[0])
          setImageUrl(URL.createObjectURL(files[0]))
          setIsChanged(true)
        }}
      />
    </button>
  )
}

EditProfileImage.propTypes = {
  size: PropTypes.number.isRequired,
  src: PropTypes.string,
  setBlob: PropTypes.func,
  setIsChanged: PropTypes.func,
}

export default EditProfileImage
