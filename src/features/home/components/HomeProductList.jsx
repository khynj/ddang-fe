import PropTypes from 'prop-types'
import HomeListHeader from './HomeListHeader'
import HomeProductItem from './HomeProductItem'
import products from '../../product/data/products'

function HomeProductList({ type }) {
  return (
    <section>
      <HomeListHeader type={type} to={type.to}></HomeListHeader>
      <div className='grid grid-cols-2 gap-4'>
        {products.slice(0, 4).map((product, i) => (
          <HomeProductItem key={i} product={product} />
        ))}
      </div>
    </section>
  )
}

HomeProductList.propTypes = {
  type: PropTypes.object.isRequired,
}

export default HomeProductList
