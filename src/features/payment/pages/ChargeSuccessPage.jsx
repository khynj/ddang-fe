import { usePayDepositSuccess } from '@/apis/pay'
import DefaultButton from '@/components/buttons/DefaultButton'
import MaterialIcon from '@/components/icons/MaterialIcon'
import StickyContainer from '@/components/StickyContainer'
import ROUTES from '@/data/ROUTES'
import usePageName from '@/hooks/usePageName'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

function ChargeSuccessPage() {
  usePageName('충전 완료')
  const route = useNavigate()
  const params = useParams()
  const { mutate: sendDepositSuccess } = usePayDepositSuccess()
  useEffect(() => {
    sendDepositSuccess(
      {
        ...params,
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
  }, [params, sendDepositSuccess])

  return (
    <div className='flex flex-col items-center justify-center gap-4 p-4 text-ddblue-400 h-full'>
      <MaterialIcon name='check_circle' filled size={40} />
      <p className='font-bold text-2xl'>충전에 성공했어요.</p>
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
