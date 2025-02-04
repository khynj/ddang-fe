import PropTypes from 'prop-types'
import ProfileImage from '../../user/components/ProfileImage'
import relativeTime from '@/utils/relativeTime'
import { Link } from 'react-router-dom'

function ChatroomItem({ chatroom }) {
  const lastSetTime = relativeTime(chatroom.lastSetTime)
  return (
    <Link
      to={`/popup/chatroom/${chatroom.chattingRoomId}`}
      className='flex items-center grid grid-cols-6 p-4 gap-5 border-b border-gray-200'
    >
      <ProfileImage src={chatroom.photo} size={52} />
      <div className='col-span-4 flex flex-col shrink w-full justify-between'>
        <div className='flex justify-between items-center'>
          <div className='font-bold'>{chatroom.nickname}</div>
          <div className='text-gray-500 text-sm'>{lastSetTime}</div>
        </div>
        <div className='flex shrink justify-between items-center gap-2'>
          <span className='tracking-tight truncate'>
            {chatroom.lastMessage}
          </span>
          <div className='bg-ddred-500 text-white rounded-full px-1.5 text-sm'>
            {chatroom.messgaesLeft}
          </div>
        </div>
      </div>
      <div className='flex shrink-0 rounded-lg w-full h-full overflow-hidden'>
        <img src={chatroom.photo} alt='' className='bg-gray-200 object-cover' />
      </div>
    </Link>
  )
}

ChatroomItem.propTypes = {
  chatroom: PropTypes.object,
}

export default ChatroomItem
