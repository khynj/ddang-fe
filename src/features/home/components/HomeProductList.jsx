import PropTypes from 'prop-types'
import HomeListHeader from './HomeListHeader'
import HomeProductItem from './HomeProductItem'
import products from '../../product/data/products'

function HomeProductList({ type }) {
  return (
    <section>
      <HomeListHeader type={type} to={type.to}></HomeListHeader>
      <div className='grid grid-cols-2 gap-4'>
        <div className='flex flex-col gap-4'>
          <HomeProductItem product={products[0]} />
          <HomeProductItem product={products[1]} />
        </div>
        <div className='flex flex-col gap-4'>
          <HomeProductItem product={products[2]} />
          <HomeProductItem product={products[3]} />
        </div>
      </div>
    </section>
  )
}

HomeProductList.propTypes = {
  type: PropTypes.object.isRequired,
}

export default HomeProductList
