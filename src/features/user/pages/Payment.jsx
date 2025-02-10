import { Link } from 'react-router'
import moneyBag from '@/assets/images/icons/moneyBag.png'
import payDdang from '@/assets/images/characters/payDdang.png'
import { usePayInfo } from '@/apis/pay'
import { useEffect } from 'react'

function Payment() {
  const { data: payInfo } = usePayInfo()
  useEffect(() => {
    console.log('payInfo', payInfo)
  }, [payInfo])
  return (
    <section
      className='relative p-4 px-5 bg-white border-b border-gray-200 mt-0'
      style={{
        background:
          'linear-gradient(295deg, #BDF1FF 2.08%, #E8EEFF 48.59%, #E091FF 48.6%, #F2CCFF 94.74%)',
      }}
    >
      <div className='absolute left-0 bottom-0 w-full flex justify-center'>
        <img src={payDdang} alt='payDdang' className='size-20' />
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <img src={moneyBag} alt='moneyBag' className='w-6 h-6' />
          <span className='font-bold text-lg text-gray-950'>땅땅머니</span>
        </div>
        <div>
          <Link
            to='/mypage/charge'
            className='bg-gray-100 text-gray-950 text-sm px-3 py-2 rounded-full font-bold'
            style={{
              cursor: 'pointer',
            }}
          >
            충전
          </Link>
        </div>
      </div>
      <div className='mt-2'>
        <div className='flex justify-between font-bold text-gray-950 mt-4'>
          <span className='text-sm'>잔액</span>
          <span>{payInfo?.balance}원</span>
        </div>
        <div className='flex justify-between font-bold text-gray-950 mt-4'>
          <span className='text-sm'>입찰가능금액</span>
          <span>{payInfo?.availableBalance}원</span>
        </div>
      </div>
    </section>
  )
}

export default Payment
