import usePageName from '@/hooks/usePageName'
import sale from '../../payment/data/sale'
import ProductHistoryItem from '../components/ProductHistoryItem'

function SaleHistory() {
  usePageName('구매내역')

  return (
    <div>
      {sale.map((product, index) => (
        <ProductHistoryItem key={index} product={product} />
      ))}
    </div>
  )
}

export default SaleHistory
