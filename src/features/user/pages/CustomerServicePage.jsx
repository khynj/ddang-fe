import usePageName from '../../../hooks/usePageName' // 페이지 이름 설정 Hook
import NoticeItem from '../components/NoticeItem'
import { customerServiceFAQs } from '../data/customerService'
import { useAuth } from '@/contexts/AuthContext'
import hi from '@/assets/images/characters/hi.png'
import { useEffect, useRef, useState } from 'react'

function CustomerServicePage() {
  usePageName('고객센터')
  const { user } = useAuth()
  const footerRef = useRef(null)
  const [footerHeight, setFooterHeight] = useState(0)

  useEffect(() => {
    if (footerRef.current) setFooterHeight(footerRef.current.clientHeight)
  }, [footerRef])

  return (
    <>
      <div
        className='flex flex-col overflow-y-scroll'
        style={{ height: `calc(100% - ${footerHeight}px)` }}
      >
        <div className='p-6 flex items-end justify-between border-b border-gray-200'>
          <p className='text-xl font-bold text-gray-800'>
            {user.nickname}님, <br />
            무엇을 도와드릴까요?
          </p>
          <img src={hi} alt='두둥이' className='w-24 h-auto' />
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
      </div>

      <div className='p-5 text-sm text-gray-600 bg-gray-100' ref={footerRef}>
        <p>전화문의 1551-0000</p>
        <p className='mt-2'>© 땅땅땅</p>
      </div>
    </>
  )
}

export default CustomerServicePage
