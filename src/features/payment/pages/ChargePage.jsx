import { useEffect, useState } from 'react'
import usePageName from '@/hooks/usePageName'
import StickyContainer from '@/components/StickyContainer'
import DefaultButton from '@/components/buttons/DefaultButton'
import { usePayDeposit, usePayInfo } from '@/apis/pay'
import { formatPrice } from '@/utils/price'

function ChargePage() {
  usePageName('충전')

  const accountName = '카카오페이'
  const [amount, setAmount] = useState(0) // 숫자로 저장
  const balanceAfterTransaction = () =>
    formatPrice(Number(amount) + Number(payInfo?.balance))

  const payDeposit = usePayDeposit()
  const { data: payInfo } = usePayInfo()

  useEffect(() => {
    console.log('payInfo', payInfo)
  }, [payInfo])

  const onChange = e => setAmount(Number(e.target.value).toString())

  const onSubmit = e => {
    e.preventDefault()
    if (amount <= 0) {
      alert('충전 금액을 확인해주세요.')
      return
    }

    payDeposit.mutate(
      { amount, paymentMethod: accountName },
      {
        onSuccess: data => {
          window.location = data?.next_redirect_mobile_url
        },
        onError: err => {
          console.log('결제 mutation err', err)
          alert('결제 중 오류가 발생했습니다.')
        },
      },
    )
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='p-4'>
        <div className='flex flex-col gap-2 mb-6'>
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
            onChange={onChange}
            className='border-2 border-ddblue-400 rounded-lg px-4 py-2 text-black font-bold text-lg'
          />
        </div>

        {/* 계좌 및 잔액 정보 */}
        <div className='flex flex-col gap-4 text-gray-900'>
          <div className='flex justify-between'>
            <span>계좌</span>
            <span className='font-bold'>{accountName}</span>
          </div>
          <div className='flex justify-between'>
            <span>거래 후 잔액</span>
            <span className='font-bold'>{balanceAfterTransaction()}원</span>
          </div>
        </div>
      </div>
      <StickyContainer plain>
        <DefaultButton submit>충전하기</DefaultButton>
      </StickyContainer>
    </form>
  )
}

export default ChargePage
