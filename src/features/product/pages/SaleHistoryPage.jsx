import usePageName from '@/hooks/usePageName'
import ProductHistoryItem from '../components/ProductHistoryItem'
import { useSearchAuctionHistories } from '@/apis/auction'

function SaleHistoryPage() {
  usePageName('판매내역')

  const { data: sale } = useSearchAuctionHistories({ role: 'seller' })

  return (
    <div>
      {sale?.auctionDetailProjection.map((product, index) => (
        <ProductHistoryItem key={index} product={product} />
      ))}
    </div>
  )
}

export default SaleHistoryPage
