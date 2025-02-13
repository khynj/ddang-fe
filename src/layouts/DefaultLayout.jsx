import { Outlet } from 'react-router'
import DefaultHeader from '../components/headers/DefaultHeader'
import PropTypes from 'prop-types'
import { useState } from 'react'
import Navbar from '../components/navbar/Navbar'

function DefaultLayout({ back, feature }) {
  const [title, setTitle] = useState('...')
  return (
    <>
      <DefaultHeader back={back} title={title} feature={feature} />
      <div className={`h-[calc(100dvh-64px)] ${!back && 'pb-[56px]'}`}>
        <Outlet context={{ setTitle }} />
        {back || <div className='py-8'></div>}
      </div>
      {back || <Navbar />}
    </>
  )
}

DefaultLayout.propTypes = {
  back: PropTypes.bool,
  feature: PropTypes.object,
}

export default DefaultLayout
