import { useAuctionDetails } from '@/apis/auction'
import usePageName from '@/hooks/usePageName'
import { useLocation, useNavigate, useParams } from 'react-router'
import ProfileSmall from '../components/ProfileSmall'
import StickyContainer from '@/components/StickyContainer'
import DefaultButton from '@/components/buttons/DefaultButton'
import StepTrustBar from '../components/StepTrustBar'
import TextArea from '@/components/form/TextArea'
import { useState } from 'react'
import useModal from '@/hooks/useModal'
import Modal from '@/components/modals/Modal'
import MaterialIcon from '@/components/icons/MaterialIcon'
import ROUTES from '@/data/ROUTES'
import { useWriteReview } from '@/apis/member'
import LoadingPage from '@/pages/LoadingPage'

function ReviewRegisterPage() {
  usePageName('리뷰 작성')
  const route = useNavigate()
  const { id: auctionId } = useParams()
  const { revieweeRole } = useLocation().state
  const { mutate: writeReview } = useWriteReview()
  const { data: auction } = useAuctionDetails(auctionId)

  const [content, setContent] = useState('')
  const [score, setScore] = useState(3)
  const { isOpen, open, close } = useModal()

  const handleSubmit = () => {
    writeReview(
      {
        auctionId,
        revieweeId: auction.seller.memberId,
        revieweeRole,
        content,
        satisfyScore: score,
      },
      {
        onSuccess: () => open(),
        onError: error => alert('error message ' + error.response.data.message),
      },
    )
    open()
  }

  const handleClose = () => {
    close()
    route(ROUTES.HOME)
  }

  if (!auction) return <LoadingPage />

  return (
    <div>
      <div className='flex flex-col gap-8 p-4'>
        <ProfileSmall user={auction.seller} />
        <div>
          <div className='flex items-center justify-between'>
            <p className='text-ddblue-400 font-bold text-[14px]'>신뢰도</p>
            <span className='text-sm font-bold'>보통</span>
          </div>
          <StepTrustBar setScore={setScore} />
        </div>
        <TextArea rows={12} value={content} setValue={setContent} />
      </div>
      <StickyContainer plain>
        <DefaultButton onClick={handleSubmit}>등록</DefaultButton>
      </StickyContainer>
      {isOpen && (
        <Modal close={close}>
          <div className='flex flex-col items-center gap-1'>
            <MaterialIcon
              name='check_circle'
              filled
              className='text-ddblue-400'
              size={32}
            />
            <p className='text-lg font-bold text-ddblue-400'>리뷰 작성 완료</p>
          </div>
          <div className='p-2'>
            <p>고마워요!</p>
          </div>
          <DefaultButton onClick={handleClose}>확인</DefaultButton>
        </Modal>
      )}
    </div>
  )
}

export default ReviewRegisterPage
