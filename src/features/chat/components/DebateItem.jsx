import PropTypes from 'prop-types'
import relativeTime from '../../../utils/relativeTime'
import { Link } from 'react-router'
import ROUTES from '@/data/ROUTES'

function DebateItem({ chatroom }) {
  const lastSetTime = relativeTime(chatroom.lastSetTime)
  return (
    <Link
      to={ROUTES.CHATROOM.replace(':id', chatroom.chattingRoomId)}
      className='flex p-4 gap-5 border-b border-gray-200'
    >
      <div className='flex flex-shrink-0'>
        <img
          src={chatroom.photo}
          alt=''
          className='aspect-square rounded-lg size-14 bg-gray-200'
        />
      </div>
      <div className='flex flex-col w-full justify-between'>
        <div className='flex justify-between items-center'>
          <div className='font-bold'>{chatroom.title}</div>
          <div className='text-gray-500 text-sm'>{lastSetTime}</div>
        </div>
        <div className='flex justify-between items-center'>
          <div className='max-w-64 tracking-tight truncate'>
            {chatroom.lastMessage}
          </div>
          <div className='bg-ddred-500 text-white rounded-full px-1.5 text-sm'>
            {chatroom.messgaesLeft}
          </div>
        </div>
      </div>
    </Link>
  )
}

DebateItem.propTypes = {
  chatroom: PropTypes.object,
}

export default DebateItem
