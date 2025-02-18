import PropTypes from 'prop-types'
import ProfileImage from '../../user/components/ProfileImage'
import { shortRelativeTime } from '@/utils/date'
import { Link } from 'react-router'
import ROUTES from '@/data/ROUTES'

function ChatroomItem({ chatroom }) {
  const lastSetTime = chatroom.lastSetTime
    ? shortRelativeTime(chatroom.lastSetTime)
    : ''
  return (
    <Link
      to={ROUTES.CHATROOM.replace(':id', chatroom.chattingRoomId)}
      className='flex items-center grid grid-cols-5 p-4 gap-5 border-b border-gray-200'
    >
      <ProfileImage src={chatroom.userPhoto} size={52} />
      <div className='col-span-3 flex flex-col shrink w-full justify-between'>
        <div className='flex justify-between items-center'>
          <div className='font-bold truncate'>{chatroom.title}</div>
          <div className='text-gray-500 text-sm shrink-0'>{lastSetTime}</div>
        </div>
        <div className='flex shrink justify-between items-center gap-2'>
          <span className='tracking-tight truncate'>
            {chatroom.lastMessage || '새로운 채팅방이 생성되었어요.'}
          </span>
          {!!chatroom.messageLeft && (
            <div className='bg-ddred-500 text-white rounded-full px-1.5 text-sm'>
              {chatroom.messageLeft}
            </div>
          )}
        </div>
      </div>
      <div className='col-span-1 flex shrink-0 rounded-lg aspect-square h-full overflow-hidden justify-end'>
        <img
          src={chatroom.productPhoto}
          alt=''
          className='bg-gray-200 object-cover'
        />
      </div>
    </Link>
  )
}

ChatroomItem.propTypes = {
  chatroom: PropTypes.object,
}

export default ChatroomItem
