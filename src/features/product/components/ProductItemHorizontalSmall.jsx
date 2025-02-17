import PropTypes from 'prop-types'
import ROUTES from '@/data/ROUTES'
import { Link } from 'react-router'
import ProductImage from './ProductImage'
import { formatPrice } from '@/utils/price'
import { useAuctionTimer } from '@/hooks/useAuctionTimer'

function ProductItemHorizontalSmall({ product }) {
  const price = formatPrice(product.currentBidPrice || product.minimumBid)
  const time = useAuctionTimer(product)

  return (
    <Link
      to={`${ROUTES.PRODUCT_DETAIL}`.replace(':id', product.auctionId)}
      className='grid grid-cols-6 gap-3 p-4 py-3 border-b border-gray-200'
    >
      <div className='col-span-1'>
        <ProductImage product={product} small />
      </div>
      <div className='flex flex-col col-span-5 justify-center'>
        <div className='flex justify-between'>
          <p className='font-bold truncate'>{product.title}</p>
          <p className='flex shrink-0 text-sm text-gray-700'>{time}</p>
        </div>
        <p className='text-sm text-gray-600'>{price}원</p>
      </div>
    </Link>
  )
}

ProductItemHorizontalSmall.propTypes = {
  product: PropTypes.object.isRequired,
}

export default ProductItemHorizontalSmall
