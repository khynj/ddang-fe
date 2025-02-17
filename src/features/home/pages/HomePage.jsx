import HomeMainSlider from '../components/HomeMainSlider'
import WelcomeBanner from '../../user/components/WelcomeBanner'
import HomeListHeader from '../components/HomeListHeader'
import { useAuth } from '@/contexts/AuthContext'
import ROUTES from '@/data/ROUTES'
import ProductItemSmall from '@/features/product/components/ProductItemSmall'
import { useSearchMyBids } from '@/apis/auction'
import HomeClosingProductList from '../components/HomeClosingProductList'
import HomeSubscribedProductList from '../components/HomeSubscribedProductList'

function HomePage() {
  const { user } = useAuth()

  const { data: biddingProducts } = useSearchMyBids({ status: 'ongoing' })

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
            {biddingProducts?.pages[0].auctionDetailProjection
              .slice(0, 9)
              .map(product => (
                <ProductItemSmall key={product.auctionId} product={product} />
              ))}
          </div>
        </section>

        <HomeClosingProductList />

        <HomeSubscribedProductList />
      </div>
    </div>
  )
}

export default HomePage
