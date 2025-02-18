import PropTypes from 'prop-types'
import ProductBiddingItem from '../components/my/ProductBiddingItem'
import ProductItemHorizontal from '../components/ProductItemHorizontal'
import ProductSoldItem from '../components/my/ProductSoldItem'
import { useSearchAuctions, useSearchMyBids } from '@/apis/auction'
import InfiniteScrollWrapper from '@/components/InfiniteScrollWrapper'
import { useAuth } from '@/contexts/AuthContext'
import Placeholder from '@/components/placeholder/Placeholder'
function MyProductListPage({ isSeller, isHammered, isPre }) {
  const params = {
    role: isSeller ? 'seller' : 'buyer',
    status: isHammered ? 'ended' : isPre ? 'upcoming' : 'ongoing',
    isHammered,
    sortType: isHammered ? 'hammeredTime' : 'endTime',
  }
  const { user } = useAuth()
  const {
    data: sales,
    fetchNextPage: fetchNextSellingPage,
    isPending: isSellPending,
    isFetching: isSellFetching,
  } = useSearchAuctions({
    ...params,
    sellerId: user.memberId,
    sortType: isPre ? 'startTime' : params.sortType,
  })

  const {
    data: myBids,
    fetchNextPage: fetchNextBidsPage,
    isPending: isBidsPending,
    isFetching: isBidsFetching,
  } = useSearchMyBids(params)

  return (
    <>
      {isSeller ? (
        sales && sales.pages[0].auctionDetailProjection.length > 0 ? (
          <InfiniteScrollWrapper
            fetchNextPage={fetchNextSellingPage}
            isPending={isSellPending}
            isFetching={isSellFetching}
          >
            {sales.pages.map(page =>
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
            )}
          </InfiniteScrollWrapper>
        ) : (
          <Placeholder>상품이 없어요.</Placeholder>
        )
      ) : (myBids && myBids.pages[0].auctionDetailProjection.length) > 0 ? (
        <InfiniteScrollWrapper
          fetchNextPage={fetchNextBidsPage}
          isPending={isBidsPending}
          isFetching={isBidsFetching}
        >
          {myBids?.pages.map(page =>
            page.auctionDetailProjection.map(product =>
              isHammered ? (
                <ProductSoldItem key={product.auctionId} product={product} />
              ) : (
                <ProductBiddingItem key={product.auctionId} product={product} />
              ),
            ),
          )}
        </InfiniteScrollWrapper>
      ) : (
        <Placeholder>상품이 없어요.</Placeholder>
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
