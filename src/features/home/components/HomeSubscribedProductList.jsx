import { useFollowingAuctions } from '@/apis/auction'
import { useFollowingList } from '@/apis/member'
import HomeListHeader from './HomeListHeader'
import ROUTES from '@/data/ROUTES'
import HomeProductItem from './HomeProductItem'

function HomeSubscribedProductList() {
  const { data: followings } = useFollowingList()
  const { data: subscribedProducts } = useFollowingAuctions(
    followings
      ? followings.followings.map(following => following.memberId)
      : [],
  )
  return (
    <section>
      <HomeListHeader
        title={`모아보기`}
        to={ROUTES.SUBSCRIPTIONS}
        icon='bookmark'
      ></HomeListHeader>
      <div className='grid grid-cols-2 gap-4'>
        {subscribedProducts?.slice(0, 4).map((product, i) => (
          <HomeProductItem key={i} product={product} />
        ))}
      </div>
    </section>
  )
}

export default HomeSubscribedProductList
