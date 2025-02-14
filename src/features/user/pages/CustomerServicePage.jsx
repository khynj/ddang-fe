import usePageName from '../../../hooks/usePageName' // 페이지 이름 설정 Hook
import NoticeItem from '../components/NoticeItem'
import { customerServiceFAQs } from '../data/customerService'
import { useAuth } from '@/contexts/AuthContext'

function CustomerServicePage() {
  usePageName('고객센터')
  const { user } = useAuth()

  return (
    <div className='max-w-4xl mx-auto bg-white'>
      <div className='p-6 flex items-end justify-between border-b border-gray-200'>
        <p className='text-xl font-bold text-gray-800'>
          {user.nickname}님, <br />
          무엇을 도와드릴까요?
        </p>
        <img
          src='https://github.com/user-attachments/assets/62656ab6-607a-49ab-875e-6402f765cd5a'
          alt='두둥이'
          className='w-24 h-auto'
        />
      </div>
      <div>
        {customerServiceFAQs.map((faq, index) => (
          <NoticeItem
            key={index}
            title={faq.title}
            content={faq.content}
            date=''
          />
        ))}
      </div>

      <div className='p-6 text-sm text-gray-600'>
        <p>전화문의 1551-0000</p>
        <p className='mt-2'>© 땅땅땅</p>
      </div>
    </div>
  )
}

export default CustomerServicePage
