import PropTypes from 'prop-types'
import { trimText } from '@/utils/trimText'
import { Link } from 'react-router-dom'
import ProductImageWithoutAHeart from './ProductImageWithoutAHeart'
import relativeTime from '@/utils/relativeTime'

function PurchaseItem({ purchase }) {
  const title = trimText(purchase.title, 14)
  const price = Intl.NumberFormat('ko-KR').format(purchase.hammeredPrice)
  const minimumBid = Intl.NumberFormat('ko-KR').format(purchase.minimumBid)
  const instantHammerPrice = Intl.NumberFormat('ko-KR').format(
    purchase.instantHammerPrice,
  )
  const day = relativeTime(purchase.hammeredTime)
  return (
    <Link
      className={`flex p-4 gap-3 border-b border-gray-300 ${
        purchase.myBidPrice && 'bg-white'
      }`}
      to={`/popup/purchase/${purchase.auctionId}`}
    >
      <div className='flex items-center shrink-0 justify-center'>
        <ProductImageWithoutAHeart purchase={purchase} />
      </div>
      <div className='flex flex-col justify-between w-full py-0.5'>
        <div className='flex justify-between'>
          <p className='font-bold text-gray-500 tracking-tight'>{title}</p>
          <p className='text-sm text-gray-700'>{day}</p>
        </div>

        <div className='flex flex-col'>
          <p className='font-bold text-gray-950'>{price}원 낙찰</p>
          <div className='text-xs text-gray-900'>
            <p className='block'>입찰시작가 {minimumBid}원</p>
            {purchase.instantHammerPrice && (
              <p className='block'>즉시낙찰가 {instantHammerPrice}원</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

PurchaseItem.propTypes = {
  purchase: PropTypes.object.isRequired,
}

export default PurchaseItem
