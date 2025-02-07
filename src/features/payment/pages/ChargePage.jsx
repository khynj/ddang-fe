import { useState } from 'react'
import usePageName from '@/hooks/usePageName'
import Charge from '../components/Charge'
import StickyContainer from '../../../components/StickyContainer'
import DefaultButton from '../../../components/buttons/DefaultButton'

function ChargePage() {
  usePageName('충전')

  const [amount, setAmount] = useState(200000) // 숫자로 저장
  const afterTransactionBalance = '161,800원'
  const accountName = '카카오페이'

  const handleChange = e => {
    const input = e.target.value.replace(/[^0-9]/g, '') // 숫자만 허용
    setAmount(Number(input)) // 숫자로 변환
  }

  return (
    <div className='flex flex-col space-y-6 w-full max-w-md mx-auto p-6 bg-white'>
      <Charge amount={amount.toLocaleString()} onChange={handleChange} />

      {/* 계좌 및 잔액 정보 */}
      <div className='flex flex-col space-y-4 text-base text-gray-900'>
        <div className='flex justify-between'>
          <span>계좌</span>
          <span className='font-bold'>{accountName}</span>
        </div>
        <div className='flex justify-between'>
          <span>거래 후 잔액</span>
          <span className='font-bold'>{afterTransactionBalance}</span>
        </div>
      </div>

      {/* 확인 버튼 */}
      <StickyContainer plain>
        <DefaultButton type='gray'>확인</DefaultButton>
      </StickyContainer>
    </div>
  )
}

export default ChargePage
