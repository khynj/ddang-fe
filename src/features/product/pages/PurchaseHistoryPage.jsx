import { useSearchAuctionHistories } from '@/apis/auction'
import usePageName from '../../../hooks/usePageName'
import ProductHistoryItem from '../components/ProductHistoryItem'
// import purchase from '../data/purchase'

function PurchaseHistoryPage() {
  usePageName('구매내역')

  const { data: purchase } = useSearchAuctionHistories({ role: 'buyer' })

  return (
    <div>
      {purchase?.auctionDetailProjection.map((product, index) => (
        <ProductHistoryItem key={index} product={product} />
      ))}
    </div>
  )
}

export default PurchaseHistoryPage
