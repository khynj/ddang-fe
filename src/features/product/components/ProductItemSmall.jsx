import PropTypes from 'prop-types'
import { dday } from '@/utils/Dday'
import MaterialIcon from '@/components/icons/MaterialIcon'
import { wonitzie } from '@/utils/wonitize'
import ROUTES from '@/data/ROUTES'
import { Link } from 'react-router'

function ProductItemSmall({ product }) {
  const price = wonitzie(product.currentBidPrice || product.minimumBid)
  const isTop = product.currentBidPrice === product.myBidPrice
  const didBid = product.myBidPrice > 0
  return (
    <Link
      to={`${ROUTES.PRODUCT_DETAIL}`.replace(':id', product.auctionId)}
      className='flex flex-col flex-shrink-0 snap-center whitespace-nowrap text-sm'
      style={{
        width: 'calc(33% - var(--spacing))',
      }}
    >
      <img
        src={product.url}
        alt={product.title}
        className='w-full aspect-square rounded-xl object-cover bg-white'
        style={{ filter: 'brightness(0.96)' }}
      />
      <span className='text-gray-800 mt-1 mb-0.5 truncate'>
        {product.title}
      </span>
      {isTop ? (
        <div
          className='w-fit h-fit px-1.5 flex flex-row items-center
          rounded-lg bg-ddblue-400 text-white gap-0.5'
        >
          <MaterialIcon name='crown' filled size={18} />
          <span className='font-bold'>{price}</span>
        </div>
      ) : (
        <div className='flex flex-row items-center whitespace-nowrap gap-0.5'>
          {didBid && (
            <div
              className='flex items-center px-1 py-0.5 rounded-lg bg-gray-400
            text-xs text-white font-bold'
            >
              뺏김
            </div>
          )}
          <span className='font-bold text-gray-700 text-md'>{price}</span>
        </div>
      )}
      <span className='text-sm text-gray-600 mt-0.5 w-fit'>
        {dday(product.endTime)} 남음
      </span>
    </Link>
  )
}

ProductItemSmall.propTypes = {
  product: PropTypes.object.isRequired,
}

export default ProductItemSmall
