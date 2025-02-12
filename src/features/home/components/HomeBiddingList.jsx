import HomeListHeader from './HomeListHeader'
import ProductItemSmall from '../../product/components/ProductItemSmall'
import ROUTES from '@/data/ROUTES'
import { useSearchAuctions } from '@/apis/auction'

function HomeBiddingList() {
  const { data: products } = useSearchAuctions({
    isHammered: false,
    role: 'buyer',
  })
  return (
    <div>
      <HomeListHeader
        type={{
          key: 'bidding',
          title: ' 입찰 현황',
          icon: 'person_raised_hand',
        }}
        to={ROUTES.MY_PRODUCTS}
      />
      <div
        className='flex flex-row gap-2 pb-1
        overflow-x-scroll snap-x snap-madatory'
      >
        {products?.auctionDetailProjection.map(product => (
          <ProductItemSmall key={product.auctionId} product={product} />
        ))}
      </div>
    </div>
  )
}

export default HomeBiddingList
