import { useSearchAuctions } from '@/apis/auction'
import HomeListHeader from './HomeListHeader'
import HomeProductItem from './HomeProductItem'
import ROUTES from '@/data/ROUTES'

function HomeClosingProductList() {
  const { data: closingProducts } = useSearchAuctions({
    status: 'ongoing',
    sortType: 'endTime',
    size: 8,
  })
  if (closingProducts) console.log(closingProducts.pages)
  return (
    <section>
      <HomeListHeader
        title={`마감 임박`}
        to={`${ROUTES.PRODUCT_LIST}?sortType=endTime`}
        icon='local_fire_department'
      ></HomeListHeader>
      <div className='grid grid-cols-2 gap-4'>
        {closingProducts?.pages[0].auctionDetailProjection
          .slice(0, 4)
          .map((product, i) => (
            <HomeProductItem key={i} product={product} />
          ))}
      </div>
    </section>
  )
}

export default HomeClosingProductList
