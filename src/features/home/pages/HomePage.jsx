import HomeMainSlider from '../components/HomeMainSlider'
import WelcomeBanner from '../../user/components/WelcomeBanner'
import HomeClosingProductList from '../components/HomeClosingProductList'
import HomeSubscribedProductList from '../components/HomeSubscribedProductList'
import HomeBiddingProductList from '../components/HomeBiddingProductList'

function HomePage() {
  return (
    <div className='flex flex-col h-full overflow-y-scroll'>
      <WelcomeBanner />
      <HomeMainSlider />
      <div className='flex flex-col gap-4 px-3'>
        <HomeBiddingProductList />
        <HomeClosingProductList />
        <HomeSubscribedProductList />
      </div>
    </div>
  )
}

export default HomePage
