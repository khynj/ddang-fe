import { useEffect, useState } from 'react'
import usePageName from '@/hooks/usePageName'
import StickyContainer from '@/components/StickyContainer'
import DefaultButton from '@/components/buttons/DefaultButton'
import { usePayDeposit, usePayInfo } from '@/apis/pay'
import { formatPrice } from '@/utils/formatPrice'

function ChargePage() {
  usePageName('충전')

  const accountName = '카카오페이'
  const [amount, setAmount] = useState(0) // 숫자로 저장
  const afterTransactionBalance = () => formatPrice(amount + payInfo?.balance)

  const payDeposit = usePayDeposit()
  const { data: payInfo } = usePayInfo()

  useEffect(() => {
    console.log('payInfo', payInfo)
  }, [payInfo])

  const onSubmit = () => {
    if (amount <= 0) {
      alert('충전 금액을 확인해주세요.')
      return
    }

    payDeposit.mutate(
      { amount, paymentMethod: accountName },
      {
        onSuccess: data => {
          window.location = data?.next_redirect_app_url
        },
        onError: err => {
          console.log('결제 mutation err', err)
        },
      },
    )
  }

  return (
    <>
      <div className='flex flex-col space-y-6 w-full max-w-md mx-auto p-4 bg-white'>
        <div className='flex flex-col space-y-2 w-full max-w-md mx-auto'>
          <label
            htmlFor='charge-amount'
            className='text-ddblue-400 text-base font-bold'
          >
            충전금액
          </label>
          <input
            id='charge-amount'
            type='number'
            inputMode='numeric' // 모바일에서 숫자 키보드 표시
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className='border-2 border-ddblue-400 rounded-lg px-4 py-2 text-black font-bold text-lg'
          />
        </div>

        {/* 계좌 및 잔액 정보 */}
        <div className='flex flex-col space-y-4 text-base text-gray-900'>
          <div className='flex justify-between'>
            <span>계좌</span>
            <span className='font-bold'>{accountName}</span>
          </div>
          <div className='flex justify-between'>
            <span>거래 후 잔액</span>
            <span className='font-bold'>{afterTransactionBalance()}원</span>
          </div>
        </div>
      </div>
      {/* 확인 버튼 */}
      <StickyContainer plain>
        <DefaultButton onClick={onSubmit}>충전하기</DefaultButton>
      </StickyContainer>
    </>
  )
}

export default ChargePage
