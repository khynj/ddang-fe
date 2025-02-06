import HomeListHeader from './HomeListHeader'
import ProductItemSmall from '../../product/components/ProductItemSmall'
import products from '../../product/data/products'
import ROUTES from '../../../data/routes'

function HomeBiddingList() {
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
        {products.map(product => (
          <ProductItemSmall key={product.auctionId} product={product} />
        ))}
      </div>
    </div>
  )
}

export default HomeBiddingList
