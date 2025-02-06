import usePageName from '../../../hooks/usePageName'
import ProductHistoryItem from '../components/ProductHistoryItem'
import purchase from '../../payment/data/purchase'

function PurchaseHistoryPage() {
  usePageName('구매내역')

  return (
    <div>
      {purchase.map((product, index) => (
        <ProductHistoryItem key={index} product={product} />
      ))}
    </div>
  )
}

export default PurchaseHistoryPage
