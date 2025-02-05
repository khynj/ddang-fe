import usePageName from '../../../hooks/usePageName'
import PurchaseItem from '../components/PurchaseItem'
import purchase from '../data/purchase'

function PurchaseHistory() {
  usePageName('구매내역')

  return (
    <div>
      {purchase.map((product, index) => (
        <PurchaseItem key={index} purchase={product} />
      ))}
    </div>
  )
}

export default PurchaseHistory
