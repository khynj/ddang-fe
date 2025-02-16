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
  const { data: products, fetchNextPage: fetchNextSellingPage } =
    useSearchAuctions({
      ...params,
      sellerId: user.memberId,
    })
  const { data: myBids, fetchNextPage: fetchNextBidsPage } =
    useSearchMyBids(params)

  console.log('myproducts', products)
  return (
    <>
      <InfiniteScrollWrapper
        fetchNextPage={isSeller ? fetchNextSellingPage : fetchNextBidsPage}
      >
        {isSeller
          ? products?.pages.map(page =>
              page.auctionDetailProjection.map(product =>
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
              ),
            )
          : myBids?.pages.map(page =>
              page.auctionDetailProjection.map(product =>
                isHammered ? (
                  <ProductSoldItem key={product.auctionId} product={product} />
                ) : (
                  <ProductBiddingItem
                    key={product.auctionId}
                    product={product}
                  />
                ),
              ),
            )}
      </InfiniteScrollWrapper>
    </>
  )
}

MyProductListPage.propTypes = {
  isSeller: PropTypes.bool,
  isHammered: PropTypes.bool,
  isPre: PropTypes.bool,
}

export default MyProductListPage
