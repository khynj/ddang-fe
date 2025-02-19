import PropTypes from 'prop-types'
import ProductBiddingItem from '../components/my/ProductBiddingItem'
import ProductItemHorizontal from '../components/ProductItemHorizontal'
import ProductSoldItem from '../components/my/ProductSoldItem'
import { useSearchAuctions, useSearchMyBids } from '@/apis/auction'
import InfiniteScrollWrapper from '@/components/InfiniteScrollWrapper'
import { useAuth } from '@/contexts/AuthContext'
import Placeholder from '@/components/placeholder/Placeholder'
import Spinner from '@/components/placeholder/Spinner'
import InlineSpinner from '@/components/placeholder/InlineSpinner'
function MyProductListPage({ isSeller, isHammered, isPre }) {
  const params = {
    role: isSeller ? 'seller' : 'buyer',
    status: isHammered ? 'ended' : isPre ? 'upcoming' : 'ongoing',
    isHammered,
    sortType: isHammered ? 'hammeredTime' : isPre ? 'startTime' : 'endTime',
    sortOrder: isHammered ? 'desc' : 'asc',
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
        !sales ? (
          <Spinner />
        ) : sales.pages[0].auctionDetailProjection.length > 0 ? (
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
            {isSellPending && <InlineSpinner />}
          </InfiniteScrollWrapper>
        ) : (
          <Placeholder>상품이 없어요.</Placeholder>
        )
      ) : (
          !myBids ? (
            <Spinner />
          ) : (
            myBids.pages[0].auctionDetailProjection.length > 0
          )
        ) ? (
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
          {isBidsFetching && <InlineSpinner />}
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
