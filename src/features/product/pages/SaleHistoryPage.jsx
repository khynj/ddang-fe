import usePageName from '@/hooks/usePageName'
import ProductHistoryItem from '../components/ProductHistoryItem'
import { useSearchAuctionHistories } from '@/apis/auction'
import Placeholder from '@/components/placeholder/Placeholder'

function SaleHistoryPage() {
  usePageName('판매내역')

  const { data: sale } = useSearchAuctionHistories({ role: 'seller' })

  return (
    <>
      {sale && sale.auctionDetailProjection.length > 0 ? (
        sale.auctionDetailProjection.map((product, index) => (
          <ProductHistoryItem key={index} product={product} />
        ))
      ) : (
        <Placeholder>판매 내역이 없어요.</Placeholder>
      )}
    </>
  )
}

export default SaleHistoryPage
