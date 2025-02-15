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
    route(`${ROUTES.PRODUCT_LIST}?searchKey=${searchKey}`)
    e.target[0].blur()
  }

  useEffect(() => {
    setSearchKey(searchParams.get('searchKey') || '')
  }, [searchParams])

  const { data: notificationStatus } = useUnreadNotificationStatus()
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
          placeholder='제목으로 검색하세요'
          value={searchKey}
          onChange={e => setSearchKey(e.target.value)}
        />
      </form>
      <IconButton
        icon={{
          name: notificationStatus?.hasUnread
            ? 'notifications_unread'
            : 'notifications',
          size: 28,
          className: 'text-gray-600',
        }}
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
