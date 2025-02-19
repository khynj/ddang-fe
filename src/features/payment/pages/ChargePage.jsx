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
    error
      ? payInfo
        ? formatPrice(payInfo.balance)
        : 0
      : formatPrice(Number(amount) + Number(payInfo?.balance))
  const [error, setError] = useState('')

  const payDeposit = usePayDeposit()
  const { data: payInfo } = usePayInfo()

  const onChange = e => {
    // 숫자만 추출
    const numericValue = e.target.value.replace(/[^0-9]/g, '')
    const value = numericValue ? parseInt(numericValue) : 0
    if (value > 10000000) return setError('1000만원 이하만 가능해요.')
    setError('')
    setAmount(value)
  }

  const onSubmit = e => {
    e.preventDefault()
    if (amount > 10000000) return alert('1000만원 이하만 가능해요.')
    if (amount <= 0) {
      alert('충전 금액을 확인해주세요.')
      return
    }

    payDeposit.mutate(
      { amount, paymentMethod: accountName },
      {
        onSuccess: data => {
          const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
          window.location.replace(
            isMobile
              ? data.next_redirect_mobile_url
              : data.next_redirect_pc_url,
          )
        },
        onError: error => {
          alert(error.response.data.message)
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
            inputMode='numeric' // 모바일에서 숫자 키보드 표시
            value={formatPrice(amount)}
            onChange={onChange}
            className={`border-2 rounded-lg px-4 py-2 text-black font-bold text-lg
              ${error ? 'invalid' : ''}
            `}
          />
          {error && <p className='text-sm text-ddred-500'>{error}</p>}
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
