import PropTypes from 'prop-types'
import MaterialIcon from '@/components/icons/MaterialIcon'
import { useRef, useState } from 'react'
import profileImage from '@/assets/images/characters/profileImage.png'
import { compressImage } from '@/utils/image'
import InlineSpinner from '@/components/placeholder/InlineSpinner'

function EditProfileImage({ src, setBlob, size, setIsChanged }) {
  const inputRef = useRef(null)
  const [imageUrl, setImageUrl] = useState(src)
  const [loading, setLoading] = useState(false)

  const selectImage = () => {
    inputRef.current.click()
  }

  const onImageChange = async e => {
    const files = e.target.files
    if (files.length == 0) return
    setLoading(true)
    let newImage = await Promise.resolve(compressImage(files[0]))
    let error = ''
    if (newImage) {
      setBlob(newImage)
      setImageUrl(URL.createObjectURL(newImage))
      setIsChanged(true)
    } else error = '지원하지 않는 파일 형식이에요.'
    if (error) alert(error)
    setLoading(false)
  }

  return (
    <button onClick={selectImage} className='flex justify-center items-center'>
      <div
        className='relative rounded-full bg-gray-100 overflow-hidden aspect-square flex justify-center items-center'
        style={{ width: size, height: size }}
      >
        {loading ? (
          <InlineSpinner />
        ) : (
          <img
            src={imageUrl || profileImage}
            alt='EditProfileImage'
            className='object-cover w-full h-full'
          />
        )}

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
        accept='image/gif, image/jpeg, image/png'
        onChange={onImageChange}
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
