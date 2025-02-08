import { Outlet } from 'react-router'
import ExploreHeader from '../components/headers/ExploreHeader'
import Navbar from '../components/navbar/Navbar'
function ExploreLayout() {
  return (
    <>
      <ExploreHeader />
      <Outlet />
      <div className='py-12'></div>
      <Navbar />
    </>
  )
}

export default ExploreLayout
