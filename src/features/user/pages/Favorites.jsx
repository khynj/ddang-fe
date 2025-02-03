import usePageName from '../../../hooks/usePageName'
import ProductItemHorizontal from '../../product/components/ProductItemHorizontal'
import products from '../../product/data/products'

function Favorites() {
  usePageName('관심목록')

  return (
    <div>
      {products.map((product, index) => (
        <ProductItemHorizontal key={index} product={product} />
      ))}
    </div>
  )
}

export default Favorites
