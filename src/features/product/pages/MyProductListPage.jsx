import PropTypes from 'prop-types'
import ProductBiddingItem from '../components/my/ProductBiddingItem'
import ProductItemHorizontal from '../components/ProductItemHorizontal'
import ProductSoldItem from '../components/my/ProductSoldItem'
import { useSearchAuctions, useSearchMyBids } from '@/apis/auction'
import InfiniteScrollWrapper from '@/components/InfiniteScrollWrapper'
import { useAuth } from '@/contexts/AuthContext'
function MyProductListPage({ isSeller, isHammered, isPre }) {
  const params = {
    role: isSeller ? 'seller' : 'buyer',
    status: isHammered ? 'ended' : isPre ? 'upcoming' : 'ongoing',
  }
  const { user } = useAuth()
  const { data: products } = useSearchAuctions({
    ...params,
    sellerId: user.memberId,
  })
  const { data: myBids } = useSearchMyBids(params)
  return (
    <InfiniteScrollWrapper>
      {isSeller
        ? products?.auctionDetailProjection.map(product =>
            isHammered ? (
              <ProductSoldItem
                key={product.auctionId}
                product={product}
                isSeller
              />
            ) : isPre ? (
              <ProductItemHorizontal
                key={product.auctionId}
                product={product}
              />
            ) : (
              <ProductItemHorizontal
                key={product.auctionId}
                product={product}
              />
            ),
          )
        : myBids?.auctionDetailProjection.map(product =>
            isHammered ? (
              <ProductSoldItem key={product.auctionId} product={product} />
            ) : (
              <ProductBiddingItem key={product.auctionId} product={product} />
            ),
          )}
    </InfiniteScrollWrapper>
  )
}

MyProductListPage.propTypes = {
  isSeller: PropTypes.bool,
  isHammered: PropTypes.bool,
  isPre: PropTypes.bool,
}

export default MyProductListPage
