import { useSearchAuctionHistories } from '@/apis/auction'
import usePageName from '../../../hooks/usePageName'
import ProductHistoryItem from '../components/ProductHistoryItem'
import Placeholder from '@/components/placeholder/Placeholder'
import Spinner from '@/components/placeholder/Spinner'
// import purchase from '../data/purchase'

function PurchaseHistoryPage() {
  usePageName('구매내역')

  const { data: purchase } = useSearchAuctionHistories({ role: 'buyer' })

  if (!purchase) return <Spinner />
  return (
    <>
      {purchase.auctionDetailProjection.length > 0 ? (
        purchase.auctionDetailProjection.map((product, index) => (
          <ProductHistoryItem key={index} product={product} role={'buyer'} />
        ))
      ) : (
        <Placeholder>구매 내역이 없어요.</Placeholder>
      )}
    </>
  )
}

export default PurchaseHistoryPage
