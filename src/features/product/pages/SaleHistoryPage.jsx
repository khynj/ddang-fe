import usePageName from '@/hooks/usePageName'
import ProductHistoryItem from '../components/ProductHistoryItem'
import { useSearchAuctionHistories } from '@/apis/auction'
import Placeholder from '@/components/placeholder/Placeholder'
import Spinner from '@/components/placeholder/Spinner'

function SaleHistoryPage() {
  usePageName('판매내역')

  const { data: sale } = useSearchAuctionHistories({ role: 'seller' })

  if (!sale) return <Spinner />
  return (
    <>
      {sale.auctionDetailProjection.length > 0 ? (
        sale.auctionDetailProjection.map((product, index) => (
          <ProductHistoryItem key={index} product={product} role={'seller'} />
        ))
      ) : (
        <Placeholder>판매 내역이 없어요.</Placeholder>
      )}
    </>
  )
}

export default SaleHistoryPage
