import usePageName from '../../../hooks/usePageName'
import ProductItemHorizontal from '../../product/components/ProductItemHorizontal'
import products from '../../product/data/products'

function SalesHistory() {
  usePageName('구매내역')

  return (
    <div>
      {products.map((product, index) => (
        <ProductItemHorizontal key={index} product={product} />
      ))}
    </div>
  )
}

export default SalesHistory
