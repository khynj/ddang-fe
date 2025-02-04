import usePageName from '../../../hooks/usePageName'
import NoticeItem from '../components/NoticeItem'
import { notices } from '../data/notices'

function Notices() {
  usePageName('공지사항')

  return (
    <div className='max-w-4xl mx-auto my-8 border border-gray-300 bg-white'>
      {notices.map((notice, index) => (
        <NoticeItem
          key={index}
          title={notice.title}
          date={notice.date}
          content={notice.content}
        />
      ))}
    </div>
  )
}

export default Notices
