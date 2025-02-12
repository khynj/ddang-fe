import usePageName from '@/hooks/usePageName'
import ProductHistoryItem from '../components/ProductHistoryItem'
import sale from '../data/sale'

function SaleHistoryPage() {
  usePageName('판매내역')

  return (
    <div>
      {sale.map((product, index) => (
        <ProductHistoryItem key={index} product={product} />
      ))}
    </div>
  )
}

export default SaleHistoryPage
