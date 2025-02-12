import PropTypes from 'prop-types'
import MaterialIcon from '@/components/icons/MaterialIcon'
import { useState } from 'react'

const NoticeItem = ({ title, date, content }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleContent = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='border-b border-gray-200' style={{ overflow: 'hidden' }}>
      <div
        className='flex justify-between items-center w-full p-6 bg-white cursor-pointer'
        onClick={toggleContent}
      >
        <div className='flex items-center w-full'>
          <MaterialIcon
            name={isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            filled
            className='text-gray-500 mr-4 flex-shrink-0'
          >
            {isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
          </MaterialIcon>
          <span
            className={`text-gray-900 text-sm font-semibold flex-grow transition-all duration-200 ${
              isOpen ? 'line-clamp-none' : 'line-clamp-2'
            }`}
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: isOpen ? 'unset' : 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </span>
        </div>
        <span
          className='text-gray-500 text-xs font-medium flex-shrink-0 ml-4'
          style={{
            whiteSpace: 'nowrap',
          }}
        >
          {date}
        </span>
      </div>

      {isOpen && (
        <div className='w-full px-6 pt-0 pb-4 bg-white text-sm text-gray-900'>
          <p className='text-gray-700 whitespace-pre-line mt-0'>{content}</p>
        </div>
      )}
    </div>
  )
}

NoticeItem.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}

export default NoticeItem
