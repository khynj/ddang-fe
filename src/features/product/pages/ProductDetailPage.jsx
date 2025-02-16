import usePageName from '@/hooks/usePageName'
import PropTypes from 'prop-types'
import ProductDetailItem from '../components/ProductDetailItem.jsx'
import ProfileSmall from '../../user/components/ProfileSmall.jsx'
import Slider from '@/components/Slider.jsx'
import MaterialIcon from '@/components/icons/MaterialIcon.jsx'
import { Link, useParams } from 'react-router'
import ROUTES from '@/data/ROUTES.js'
import { formatPrice } from '@/utils/price.js'
import { useAuctionDetails } from '@/apis/auction.js'
import LoadingPage from '@/pages/LoadingPage.jsx'
import { relativeTime } from '@/utils/date'
import { parseTradeType } from '@/utils/auction.js'
import ProductDetailDrawer from '../components/ProductDetailDrawer.jsx'
import { useAuth } from '@/contexts/AuthContext.jsx'
import RelatedProductList from '../components/RelatedProductList.jsx'

function ProductDetailPage() {
  const productId = useParams().id
  const { data: product, isPending } = useAuctionDetails(productId)
  const { user } = useAuth()
  usePageName(product ? product.auction.productName : '제품상세')

  if (isPending) return <LoadingPage />

  const { auction, seller } = product
  const tradeType = parseTradeType(auction.tradeType)

  return (
    <div className='flex flex-col h-full gap-2 pb-64 overflow-y-scroll'>
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
            {!!auction.instantHammerPrice && (
              <ProductDetailItem
                name='즉시낙찰가'
                value={formatPrice(auction.instantHammerPrice) + '원'}
                bold
              />
            )}
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
              to={`${ROUTES.PRODUCT_LIST}?categoryId=${auction.category.categoryId}&categoryName=${auction.category.categoryName}`}
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
          <p className='pt-2 text-black tracking-tight whitespace-pre-wrap'>
            {auction.content}
          </p>
        </div>
        <hr className='border-gray-200' />
        <div className='flex flex-col'>
          <ProductDetailItem
            name='개찰 시각'
            value={new Date(auction.startTime).toLocaleString()}
          />
          <ProductDetailItem
            name='종료 시각'
            value={new Date(auction.endTime).toLocaleString()}
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
        <RelatedProductList product={product} />
      </div>
      <ProductDetailDrawer
        product={product}
        isMine={seller.memberId == user.memberId}
      />
    </div>
  )
}

ProductDetailPage.propTypes = {
  product: PropTypes.object,
}

export default ProductDetailPage
