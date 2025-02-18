import { useNavigate, useSearchParams } from 'react-router'
import IconButton from '../buttons/IconButton'
import ROUTES from '../../data/ROUTES'
import { useUnreadNotificationStatus } from '@/apis/notifications'
import { useEffect, useState } from 'react'

function ExploreHeader() {
  const [searchParams] = useSearchParams()
  const route = useNavigate()
  const [searchKey, setSearchKey] = useState(
    searchParams.get('searchKey') || '',
  )

  const search = e => {
    e.preventDefault()
    const params = { searchKey: searchKey }
    searchParams.keys().forEach(key => {
      if (key !== 'searchKey') params[key] = searchParams.get(key)
    })
    let url = `${ROUTES.PRODUCT_LIST}?`
    Object.keys(params).forEach((key, i) => {
      url += `${key}=${params[key]}${
        i === Object.keys(params).length - 1 ? '' : '&'
      }`
    })
    route(url)
    e.target[0].blur()
  }

  useEffect(() => {
    setSearchKey(searchParams.get('searchKey') || '')
  }, [searchParams])

  const { data: notificationStatus } = useUnreadNotificationStatus()

  // 30자 이하
  const onChange = e => {
    console.log(e.target.value.length)
    if (e.target.value.length > 30) return
    setSearchKey(e.target.value)
  }

  return (
    <header
      className={`
      w-full h-[56px] px-4 py-2
      flex flex-row gap-3 items-center`}
    >
      <form action='' className='flex grow h-full' onSubmit={search}>
        <input
          className={`px-3 h-full w-full rounded-xl text-sm border border-gray-400 font-bold text-gray-950`}
          type='text'
          placeholder='제품을 검색하세요'
          value={searchKey}
          onChange={onChange}
        />
      </form>
      <IconButton
        icon={
          notificationStatus?.hasUnread
            ? {
                name: 'notifications_unread',
                size: 28,
                className: 'text-ddred-500',
              }
            : {
                name: 'notifications',
                size: 28,
                className: 'text-gray-600',
              }
        }
        onClick={() => route(ROUTES.NOTIFICATIONS)}
      />
      <IconButton
        icon={{
          name: 'forum',
          size: 28,
          className: 'text-gray-600',
        }}
        onClick={() => route(ROUTES.CHAT)}
      />
    </header>
  )
}

export default ExploreHeader
