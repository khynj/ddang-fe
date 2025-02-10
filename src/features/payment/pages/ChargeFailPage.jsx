import usePageName from '@/hooks/usePageName'
import inBoard from '@/assets/images/characters/inBoard.png'
import StickyContainer from '@/components/StickyContainer'
import DefaultButton from '@/components/buttons/DefaultButton'
import { useNavigate } from 'react-router'
import ROUTES from '@/data/ROUTES'
import MaterialIcon from '@/components/icons/MaterialIcon'

function ChargeFailPage() {
  usePageName('충전')
  const route = useNavigate()
  return (
    <div className='flex flex-col items-center justify-center gap-4 p-4 text-ddred-500 h-full'>
      <MaterialIcon name='error' filled size={40} />
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

export default ChargeFailPage
