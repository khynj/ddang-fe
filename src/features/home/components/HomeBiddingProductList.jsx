import { useAuth } from '@/contexts/AuthContext'
import HomeListHeader from './HomeListHeader'
import { useSearchMyBids } from '@/apis/auction'
import ROUTES from '@/data/ROUTES'
import ProductItemSmall from '@/features/product/components/ProductItemSmall'
import InlinePlaceholder from '@/components/placeholder/InlinePlaceholder'

function HomeBiddingProductList() {
  const { user } = useAuth()
  const { data: biddingProducts } = useSearchMyBids({ status: 'ongoing' })
  return (
    <section>
      <HomeListHeader
        title={`${user.nickname}님의 입찰현황`}
        icon='person_raised_hand'
        to={ROUTES.MY_PRODUCTS}
      />
      {biddingProducts &&
      biddingProducts.pages[0].auctionDetailProjection.length > 0 ? (
        <div
          className='flex flex-row gap-2 pb-1
          overflow-x-scroll snap-x snap-madatory'
        >
          {biddingProducts.pages[0].auctionDetailProjection
            .slice(0, 9)
            .map(product => (
              <ProductItemSmall key={product.auctionId} product={product} />
            ))}
        </div>
      ) : (
        <InlinePlaceholder>입찰중인 상품이 없어요.</InlinePlaceholder>
      )}
    </section>
  )
}

export default HomeBiddingProductList
