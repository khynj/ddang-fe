import PropTypes from 'prop-types'

function ProductImageWithoutAHeart_purchase({ purchase }) {
  return (
    <div
      className='size-20 aspect-square flex shrink-0 items-center
        brightness-97 bg-white rounded-xl overflow-hidden'
    >
      <img
        src={purchase.photo}
        alt={purchase.title}
        className='object-contain'
      />
    </div>
  )
}

ProductImageWithoutAHeart_purchase.propTypes = {
  purchase: PropTypes.object.isRequired,
}

export default ProductImageWithoutAHeart_purchase
