import usePageName from '@/hooks/usePageName'
import PropTypes from 'prop-types'
import ProductDetailItem from '../components/ProductDetailItem.jsx'
import ProfileSmall from '../../user/components/ProfileSmall.jsx'
import Slider from '@/components/Slider.jsx'
import MaterialIcon from '@/components/icons/MaterialIcon.jsx'
import ProductItemSmall from '../components/ProductItemSmall.jsx'
import products from '../data/products.js'
import { Link, useParams } from 'react-router'
import ROUTES from '@/data/ROUTES.js'
import { formatPrice } from '@/utils/formatPrice.js'
import { useAuctionDetails } from '@/apis/auction.js'
import LoadingPage from '@/pages/LoadingPage.jsx'
import { dateLocale } from '@/utils/date.js'
import { parseTradeType } from '@/utils/auction.js'
import relativeTime from '@/utils/relativeTime.js'
import ProductDetailDrawer from '../components/ProductDetailDrawer.jsx'

function ProductDetailPage() {
  usePageName('제품상세')

  const productId = useParams().id
  const { data: product, isLoading } = useAuctionDetails(productId)

  if (isLoading) return <LoadingPage />

  const { auction, seller } = product
  const tradeType = parseTradeType(auction.tradeType)

  return (
    <div className='flex flex-col gap-2 pb-72'>
      <Slider>
        {auction.photos.map((photo, index) => (
          <div
            key={index}
            className='flex items-center justify-center shrink-0
             w-full max-w-lg aspect-square snap-center
             brightness-97 bg-white'
          >
            <img
              src={photo}
              alt={auction.productName}
              className='object-cover'
            />
          </div>
        ))}
      </Slider>
      <div className='flex flex-col gap-6 p-4'>
        <div className='flex flex-col gap-4'>
          <h1 className='text-lg font-bold text-gray-950'>
            {auction.productName}
          </h1>
          <div className='flex flex-col gap-1 text-gray-900'>
            <ProductDetailItem
              name='입찰시작가'
              value={formatPrice(auction.minimumBid) + '원'}
              bold
            />
            <ProductDetailItem
              name='즉시낙찰가'
              value={formatPrice(auction.instantHammerPrice) + '원'}
              bold
            />
          </div>
          <div className='flex gap-4 text-sm font-bold text-gray-900'>
            <div className='flex items-center gap-0.5'>
              <MaterialIcon name='person_raised_hand' filled size={18} />
              <span>입찰자</span>
              <span>{auction.bidderCount}명</span>
            </div>
            <div className='flex items-center gap-0.5'>
              <MaterialIcon name='front_hand' filled size={18} />
              <span>입찰</span>
              <span>{auction.bidCount}건</span>
            </div>
          </div>
        </div>
        <hr className='border-gray-200' />
        <div className='flex flex-col gap-1'>
          <p className='font-bold text-lg text-gray-950 leading-none'>
            {auction.title}
          </p>
          <div className='text-gray-500 text-sm'>
            <Link
              to={`${ROUTES.PRODUCT_LIST}?category=${auction.category.categoryId}&categoryName=${auction.category.categoryName}`}
            >
              <span className='underline'>
                {auction.category.parentCategoryName}
                {' > '}
                {auction.category.categoryName}
              </span>
            </Link>
            <span className='px-2 text-'>·</span>
            <span>{relativeTime(auction.createdAt)}</span>
          </div>
          <p className='pt-2 text-black tracking-tight'>{auction.content}</p>
        </div>
        <hr className='border-gray-200' />
        <div className='flex flex-col'>
          <ProductDetailItem
            name='개찰 시각'
            value={dateLocale(auction.startTime)}
          />
          <ProductDetailItem
            name='종료 시각'
            value={dateLocale(auction.endTime)}
          />
          <ProductDetailItem name='거래 방식' value={tradeType} />
          {auction.tradeType.isDirect && (
            <ProductDetailItem name='직거래 장소' value={auction.location} />
          )}
        </div>
        <hr className='border-gray-200' />
        <Link
          to={ROUTES.PROFILE.replace(':id', seller.memberId)}
          className='flex flex-col gap-2'
        >
          <ProfileSmall user={seller} />
        </Link>
        <hr className='border-gray-200' />
        <div className='flex flex-col gap-3'>
          <h1 className='font-bold'>{auction.productName} 관련 매물</h1>
          <div
            className='flex flex-row gap-2 pb-1
        overflow-x-scroll snap-x snap-madatory'
          >
            {products.map((product, i) => (
              <ProductItemSmall product={{ ...product, id: i }} key={i} />
            ))}
          </div>
        </div>
      </div>
      <ProductDetailDrawer product={product} />
    </div>
  )
}

ProductDetailPage.propTypes = {
  product: PropTypes.object,
}

export default ProductDetailPage
