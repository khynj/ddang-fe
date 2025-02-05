import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import relativeTime from '@/utils/relativeTime'
import ProductImageWithoutAHeart_sale from './ProductImageWithoutAHeart_sale'

function SaleItem({ sale }) {
  const price = sale.hammeredTime
    ? Intl.NumberFormat('ko-KR').format(sale.hammeredPrice) + '원 낙찰'
    : '유찰'
  const minimumBid = Intl.NumberFormat('ko-KR').format(sale.minimumBid)
  const instantHammerPrice = sale.instantHammerPrice
    ? Intl.NumberFormat('ko-KR').format(sale.instantHammerPrice)
    : null
  const day = sale.endTime ? relativeTime(sale.endTime) : ''

  return (
    <Link
      className={`flex p-4 gap-3 border-b border-gray-300 ${
        sale.myBidPrice && 'bg-white'
      }`}
      to={`/popup/sale/${sale.auctionId}`}
    >
      <div className='flex items-center shrink-0 justify-center'>
        <ProductImageWithoutAHeart_sale sale={sale} />
      </div>
      <div className='flex flex-col justify-between w-full py-0.5'>
        <div className='flex justify-between'>
          <p className='font-bold text-gray-500 tracking-tight truncate'>
            {sale.title}
          </p>
          <p className='text-sm text-gray-700'>{day}</p>
        </div>

        <div className='flex flex-col'>
          <p className='font-bold text-gray-950'>{price}</p>
          <div className='text-xs text-gray-900'>
            <p className='block'>입찰시작가 {minimumBid}원</p>
            {sale.instantHammerPrice && (
              <p className='block'>즉시낙찰가 {instantHammerPrice}원</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

SaleItem.propTypes = {
  sale: PropTypes.object.isRequired,
}

export default SaleItem
