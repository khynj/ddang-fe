import PropTypes from 'prop-types'
import ProductItemSmall from './ProductItemSmall'
import { useRelatedAuctions } from '@/apis/auction'

function RelatedProductList({ product }) {
  const { data: products } = useRelatedAuctions(product.auction.auctionId)
  return (
    <div className='flex flex-col gap-3'>
      <h1 className='font-bold'>{product.auction.productName} 관련 매물</h1>
      <div
        className='flex flex-row gap-2 pb-1
            overflow-x-scroll snap-x snap-madatory'
      >
        {products?.map((product, i) => (
          <ProductItemSmall product={product} key={i} />
        ))}
      </div>
    </div>
  )
}

RelatedProductList.propTypes = {
  product: PropTypes.object,
}

export default RelatedProductList
