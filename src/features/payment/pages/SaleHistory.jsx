import usePageName from '../../../hooks/usePageName'
import SaleItem from '../components/SaleItem'
import sale from '../data/sale'

function SaleHistory() {
  usePageName('구매내역')

  return (
    <div>
      {sale.map((product, index) => (
        <SaleItem key={index} sale={product} />
      ))}
    </div>
  )
}

export default SaleHistory
