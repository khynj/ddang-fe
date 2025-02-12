import { usePayDepositSuccess } from '@/apis/pay'
import DefaultButton from '@/components/buttons/DefaultButton'
import MaterialIcon from '@/components/icons/MaterialIcon'
import StickyContainer from '@/components/StickyContainer'
import ROUTES from '@/data/ROUTES'
import usePageName from '@/hooks/usePageName'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

function ChargeSuccessPage() {
  usePageName('충전')
  const route = useNavigate()
  const [searchParams] = useSearchParams()
  const {
    mutate: sendDepositSuccess,
    isError,
    isSuccess,
  } = usePayDepositSuccess()
  useEffect(() => {
    sendDepositSuccess(
      {
        pg_token: searchParams.get('pg_token'),
        order_id: searchParams.get('order_id'),
      },
      {
        onSuccess: data => {
          console.log('충전 성공', data)
        },
        onError: err => {
          console.log('충전 실패', err)
        },
      },
    )
  }, [searchParams, sendDepositSuccess])

  return (
    <div className='flex flex-col items-center justify-center gap-4 p-4 h-[80%]'>
      {isSuccess ? (
        <>
          <MaterialIcon
            name='check_circle'
            filled
            size={40}
            className='text-ddblue-400'
          />
          <p className='font-bold text-2xl text-ddblue-400'>
            충전이 완료되었어요.
          </p>
        </>
      ) : isError ? (
        <>
          <MaterialIcon
            name='error'
            filled
            size={40}
            className='text-ddred-500'
          />
          <p className='font-bold text-2xl text-ddred-500'>
            충전에 실패했어요.
          </p>
        </>
      ) : (
        <>
          <MaterialIcon
            name='pending'
            filled
            size={40}
            className='text-gray-700'
          />
          <p className='font-bold text-2xl text-gray-700'>
            카카오톡에서 결제를 완료해주세요.
          </p>
        </>
      )}
      <StickyContainer>
        <DefaultButton
          type='gray'
          onClick={() => route(ROUTES.MYPAGE)}
          className='w-full'
        >
          돌아가기
        </DefaultButton>
      </StickyContainer>
    </div>
  )
}

export default ChargeSuccessPage
