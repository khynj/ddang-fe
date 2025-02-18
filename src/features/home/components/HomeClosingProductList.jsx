import { useSearchAuctions } from '@/apis/auction'
import HomeListHeader from './HomeListHeader'
import HomeProductItem from './HomeProductItem'
import ROUTES from '@/data/ROUTES'
import InlinePlaceholder from '@/components/placeholder/InlinePlaceholder'
import InlineSpinner from '@/components/placeholder/InlineSpinner'

function HomeClosingProductList() {
  const { data: closingProducts } = useSearchAuctions({
    status: 'ongoing',
    sortType: 'endTime',
    size: 8,
  })
  if (!closingProducts) return <InlineSpinner />

  return (
    <section>
      <HomeListHeader
        title={`마감 임박`}
        to={`${ROUTES.PRODUCT_LIST}?sortType=endTime`}
        icon='local_fire_department'
      ></HomeListHeader>
      {closingProducts.pages[0].auctionDetailProjection.length > 0 ? (
        <div className='grid grid-cols-2 gap-4'>
          {closingProducts.pages[0].auctionDetailProjection
            .slice(0, 4)
            .map((product, i) => (
              <HomeProductItem key={i} product={product} />
            ))}
        </div>
      ) : (
        <InlinePlaceholder>경매중인 상품이 없어요.</InlinePlaceholder>
      )}
    </section>
  )
}

export default HomeClosingProductList
