import PropTypes from 'prop-types'
import ProductImage from './ProductImage'
import { dday } from '@/utils/Dday'
import MaterialIcon from '@/components/icons/MaterialIcon'
import { Link } from 'react-router-dom'
import ROUTES from '@/data/ROUTES'

function ProductItemHorizontal({ product }) {
  const price = Intl.NumberFormat('ko-KR').format(product.currentBidPrice)
  const instantHammerPrice = Intl.NumberFormat('ko-KR').format(
    product.instantHammerPrice,
  )
  return (
    <Link
      className={`grid grid-cols-8 p-4 gap-3 border-b border-gray-200 ${
        product.myBidPrice && 'bg-gray-50'
      }`}
      to={ROUTES.PRODUCT_DETAIL.replace(':id', product.auctionId)}
    >
      <div className='col-span-2'>
        <ProductImage product={product} heartSize={26} heart />
      </div>
      <div className='col-span-4 flex flex-col w-full py-0.5 justify-between'>
        <div className='flex justify-between'>
          <p className='font-bold text-gray-900 tracking-tight truncate'>
            {product.title}
          </p>
        </div>
        <div className='flex justify-between'>
          <div>
            <div className='flex items-center mt-2 mb-0.5 '>
              {product.myBidPrice && (
                <MaterialIcon
                  name='gavel'
                  filled
                  size={22}
                  className='text-ddblue-400'
                />
              )}
              <p className='text-lg font-semibold text-gray-950 leading-none'>
                {price}원
              </p>
            </div>
            {product.instantHammerPrice && (
              <p className='text-sm text-gray-600'>
                즉시낙찰가 {instantHammerPrice}원
              </p>
            )}
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-between items-end col-span-2'>
        <p className='text-sm text-gray-700'>{dday(product.endTime)} 남음</p>

        <div className='flex items-end text-gray-600 gap-2'>
          <div className='flex items-center gap-0.5'>
            <MaterialIcon name='person_raised_hand' filled size={18} />
            <span className='text-sm tracking-tight'>
              {product.bidderCount}
            </span>
          </div>
          <div className='flex items-center gap-0.5'>
            <MaterialIcon name='front_hand' filled size={18} />
            <span className='text-sm tracking-tight'>{product.bidCount}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

ProductItemHorizontal.propTypes = {
  product: PropTypes.object.isRequired,
}

export default ProductItemHorizontal
