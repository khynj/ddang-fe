import DefaultButton from '@/components/buttons/DefaultButton'
import ROUTES from '@/data/ROUTES'
import { useNavigate } from 'react-router'

function NotFoundPage() {
  const route = useNavigate()
  return (
    <>
      <p>요청하신 페이지를 찾을 수 없습니다.</p>
      <DefaultButton onClick={() => route(ROUTES.HOME, { replace: true })}>
        홈으로
      </DefaultButton>
    </>
  )
}

export default NotFoundPage
