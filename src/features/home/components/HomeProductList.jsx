import PropTypes from 'prop-types'
import HomeListHeader from './HomeListHeader'
import HomeProductItem from './HomeProductItem'
import { useSearchAuctions } from '@/apis/auction'

function HomeProductList({ type }) {
  const params =
    type == 'HOT' ? { sortType: 'endTime' } : { sortType: 'createdAt' }
  const { data: products } = useSearchAuctions({ ...params, size: 4 })
  return (
    <section>
      <HomeListHeader type={type} to={type.to}></HomeListHeader>
      <div className='grid grid-cols-2 gap-4'>
        {products?.auctionDetailProjection.slice(0, 4).map((product, i) => (
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
