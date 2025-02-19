import PropTypes from 'prop-types'
import RegisteredImage from './RegisteredImage'
import MaterialIcon from '@/components/icons/MaterialIcon'
import { useRef, useState } from 'react'
import { compressImage } from '@/utils/image'
import InlineSpinner from '@/components/placeholder/InlineSpinner'

function ImagePicker({ images, setImages, imageLinks, setImageLinks }) {
  const inputRef = useRef(null)
  const [loading, setLoading] = useState(false)

  const deleteImage = src => {
    const newImages = images.filter(image => image !== src)
    setImages(newImages)
  }
  const deleteImageLink = link => {
    const newImageLinks = imageLinks.filter(currentLink => currentLink !== link)
    setImageLinks(newImageLinks)
  }

  const onImageChange = async e => {
    const files = e.target.files
    if (files.length == 0) return
    setLoading(true)
    let newImages = await Promise.all(
      Array.from(files).map(file => compressImage(file)),
    )
    let error = ''
    newImages = newImages.filter(image => {
      if (!image) {
        error = '지원하지 않는 형식의 파일을 제외합니다.'
        return false
      }
      return !!image
    })
    if (error) {
      if (newImages.length === 0) alert('지원하지 않는 파일 형식이에요.')
      else alert(error)
    }
    setLoading(false)
    setImages([...images, ...newImages].slice(0, 10 - imageLinks.length))
  }

  return (
    <div className='flex flex-row flex-wrap items-center gap-2 my-2'>
      {images.length + imageLinks.length < 10 && (
        <div
          onClick={() => inputRef.current.click()}
          className='w-[18%] aspect-square p-2
          flex flex-col items-center justify-around rounded-lg bg-white cursor-pointer
          border border-gray-300'
        >
          <MaterialIcon
            name='photo_camera'
            filled
            size={32}
            className={'text-gray-400'}
          />
          <span
            className={`text-xs whitespace-nowrap ${
              images.length + imageLinks.length == 10
                ? 'text-ddred-500'
                : 'text-gray-600'
            }`}
          >
            {images.length + imageLinks.length}/ 10
          </span>
        </div>
      )}
      {imageLinks.map((src, index) => (
        <RegisteredImage
          key={index}
          src={src}
          isLink
          deleteFunc={() => deleteImageLink(src)}
        />
      ))}
      {images.map((src, index) => (
        <RegisteredImage
          key={index}
          src={src}
          deleteFunc={() => deleteImage(src)}
        />
      ))}

      {loading && <InlineSpinner />}

      <input
        ref={inputRef}
        className='hidden'
        type='file'
        accept='image/gif, image/jpeg, image/png'
        multiple
        onChange={onImageChange}
      />
    </div>
  )
}

ImagePicker.propTypes = {
  images: PropTypes.array,
  setImages: PropTypes.func,
  imageLinks: PropTypes.array,
  setImageLinks: PropTypes.func,
}

export default ImagePicker
