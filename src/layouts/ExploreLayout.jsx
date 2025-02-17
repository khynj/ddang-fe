import { Outlet } from 'react-router'
import ExploreHeader from '../components/headers/ExploreHeader'
import Navbar from '../components/navbar/Navbar'
function ExploreLayout() {
  return (
    <>
      <div className='h-[calc(100dvh-64px)] pb-[56px]'>
        <ExploreHeader />
        <Outlet />
      </div>
      <Navbar />
    </>
  )
}

export default ExploreLayout
