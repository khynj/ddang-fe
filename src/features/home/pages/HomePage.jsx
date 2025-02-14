import HomeMainSlider from '../components/HomeMainSlider'
import WelcomeBanner from '../../user/components/WelcomeBanner'
import HomeListHeader from '../components/HomeListHeader'
import HomeProductItem from '../components/HomeProductItem'
import { useAuth } from '@/contexts/AuthContext'
import ROUTES from '@/data/ROUTES'
import ProductItemSmall from '@/features/product/components/ProductItemSmall'
import {
  useFollowingAuctions,
  useSearchAuctions,
  useSearchMyBids,
} from '@/apis/auction'
import { useFollowingList } from '@/apis/member'

function HomePage() {
  const { user } = useAuth()

  const { data: biddingProducts } = useSearchMyBids({})

  const { data: closingProducts } = useSearchAuctions({
    sortType: 'endTime',
    size: 4,
  })

  const { data: followings } = useFollowingList()
  const { data: subscribedProducts } = useFollowingAuctions(
    followings
      ? followings.followings.map(following => following.memberId)
      : [],
  )

  return (
    <div className='flex flex-col h-full overflow-y-scroll'>
      <WelcomeBanner />
      <HomeMainSlider />
      <div className='flex flex-col gap-4 px-3'>
        <section>
          <HomeListHeader
            title={`${user.nickname}님의 입찰현황`}
            icon='person_raised_hand'
            to={ROUTES.MY_PRODUCTS}
          />
          <div
            className='flex flex-row gap-2 pb-1
          overflow-x-scroll snap-x snap-madatory'
          >
            {biddingProducts?.auctionDetailProjection
              .slice(0, 9)
              .map(product => (
                <ProductItemSmall key={product.auctionId} product={product} />
              ))}
          </div>
        </section>

        <section>
          <HomeListHeader
            title={`마감 임박`}
            to={`${ROUTES.PRODUCT_LIST}?sortType=endTime`}
            icon='local_fire_department'
          ></HomeListHeader>
          <div className='grid grid-cols-2 gap-4'>
            {closingProducts?.auctionDetailProjection
              .slice(0, 4)
              .map((product, i) => (
                <HomeProductItem key={i} product={product} />
              ))}
          </div>
        </section>

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
      </div>
    </div>
  )
}

export default HomePage
