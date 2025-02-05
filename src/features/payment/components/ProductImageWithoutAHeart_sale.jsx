import PropTypes from 'prop-types'

function ProductImageWithoutAHeart_sale({ sale }) {
  return (
    <div
      className='size-20 aspect-square flex shrink-0 items-center
        brightness-97 bg-white rounded-xl overflow-hidden'
    >
      <img src={sale.photo} alt={sale.title} className='object-contain' />
    </div>
  )
}

ProductImageWithoutAHeart_sale.propTypes = {
  sale: PropTypes.object.isRequired,
}

export default ProductImageWithoutAHeart_sale
