import PropTypes from 'prop-types'
import ProductBiddingItem from '../components/my/ProductBiddingItem'
import ProductItemHorizontal from '../components/ProductItemHorizontal'
import ProductSoldItem from '../components/my/ProductSoldItem'
import { useSearchAuctions } from '@/apis/auction'
function MyProductListPage({ isSeller, isHammered, isPre }) {
  const params = {
    isSeller,
    isHammered,
    isPre,
  }
  const { data: products } = useSearchAuctions(params)
  return (
    <>
      {products?.auctionDetailProjection.map(product =>
        isSeller ? (
          isHammered ? (
            <ProductSoldItem
              key={product.auctionId}
              product={product}
              isSeller
            />
          ) : isPre ? (
            <ProductItemHorizontal key={product.auctionId} product={product} />
          ) : (
            <ProductItemHorizontal key={product.auctionId} product={product} />
          )
        ) : isHammered ? (
          <ProductSoldItem key={product.auctionId} product={product} />
        ) : (
          <ProductBiddingItem key={product.auctionId} product={product} />
        ),
      )}
    </>
  )
}

MyProductListPage.propTypes = {
  isSeller: PropTypes.bool,
  isHammered: PropTypes.bool,
  isPre: PropTypes.bool,
}

export default MyProductListPage
