import PropTypes from 'prop-types'
import ProfileImage from '../../user/components/ProfileImage'
import MaterialIcon from '../../../components/icons/MaterialIcon'

function ChatItem({ chat }) {
  const isMe = chat.nickname == 'Bob'
  const isSystem = chat.nickname == 'SYSTEM'
  const createdTime = new Date(chat.createdTime).toLocaleTimeString('ko-KR', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  })
  return (
    <div className={`flex ${isMe ? 'justify-end' : ''} p-4`}>
      <div className='flex items-center gap-2'>
        {isMe && (
          <div className='flex h-full items-end text-xs text-gray-500'>
            <div>{createdTime}</div>
          </div>
        )}
        {!isMe &&
          (isSystem ? (
            <MaterialIcon
              name='campaign'
              size={36}
              className='text-gray-600'
              filled
            />
          ) : (
            <ProfileImage src={chat.photo} size={36} />
          ))}
        <div className={`flex flex-col ${isMe ? 'items-end' : ''}`}>
          {!isMe && (
            <div className='font-bold text-gray-800'>{chat.nickname}</div>
          )}
          <div
            className={`rounded-xl p-2 px-3 ${
              isSystem
                ? 'bg-gray-600 text-white'
                : isMe
                ? 'bg-gray-200 text-gray-950'
                : 'bg-gray-50 text-gray-950'
            }`}
          >
            {chat.content}
          </div>
        </div>
        {!isMe && (
          <div className='flex h-full items-end text-xs text-gray-500'>
            <div>{createdTime}</div>
          </div>
        )}
      </div>
    </div>
  )
}

ChatItem.propTypes = {
  chat: PropTypes.object,
  me: PropTypes.bool,
}

export default ChatItem
