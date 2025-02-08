import PropTypes from 'prop-types'
import ProductBiddingItem from '../components/my/ProductBiddingItem'
import products from '../data/products'
import ProductItemHorizontal from '../components/ProductItemHorizontal'
import ProductSoldItem from '../components/my/ProductSoldItem'
function MyProductListPage({ isSeller, isHammered, isPre }) {
  return (
    <>
      {products.map(product =>
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
