import DefaultButton from '@/components/buttons/DefaultButton'
import MaterialIcon from '@/components/icons/MaterialIcon'
import StickyContainer from '@/components/StickyContainer'
import ROUTES from '@/data/ROUTES'
import usePageName from '@/hooks/usePageName'
import { useNavigate } from 'react-router'

function ChargeSuccessPage() {
  usePageName('충전 완료')
  const route = useNavigate()
  return (
    <div className='flex flex-col items-center justify-center gap-4 p-4 text-ddblue-400 h-full'>
      <MaterialIcon name='check_circle' filled size={40} />
      <p className='font-bold text-2xl'>충전에 실패했어요.</p>
      <StickyContainer>
        <DefaultButton
          type='gray'
          onClick={() => route(ROUTES.CHARGE)}
          className='w-full'
        >
          돌아가기
        </DefaultButton>
      </StickyContainer>
    </div>
  )
}

export default ChargeSuccessPage
