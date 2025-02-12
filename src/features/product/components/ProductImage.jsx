import PropTypes from 'prop-types'
import FavoriteButton from '@/components/icons/FavoriteButton'
import { useToggleFavorite } from '@/apis/auction'

function ProductImage({ product, heartSize = 32, heart, small }) {
  const { mutate: toggleLike } = useToggleFavorite()
  const onClick = () => {
    toggleLike(product.auctionId, {
      onSuccess: () => {
        product.isFavorite = !product.isFavorite
      },
    })
  }
  return (
    <div
      className={`relative w-full aspect-square flex items-center justify-center
        brightness-97 bg-white rounded-${small ? 'lg' : 'xl'} overflow-hidden`}
    >
      {heart && (
        <div className='absolute top-[4%] left-[4%]'>
          <FavoriteButton
            onClick={onClick}
            liked={product.isFavorite}
            size={heartSize}
          />
        </div>
      )}
      <img
        src={product.url}
        alt={product.title}
        className='h-full object-contain'
      />
    </div>
  )
}

ProductImage.propTypes = {
  product: PropTypes.object.isRequired,
  heartSize: PropTypes.number,
  heart: PropTypes.bool,
  small: PropTypes.bool,
}

export default ProductImage
