import { useAuctionDetails } from '@/apis/auction'
import usePageName from '@/hooks/usePageName'
import { useNavigate, useParams } from 'react-router'
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
import { VALIDATIONS } from '@/utils/VALIDATIONS'
import { scoreToText } from '@/utils/member'
import Spinner from '@/components/placeholder/Spinner'

function ReviewRegisterPage() {
  usePageName('리뷰 작성')
  const route = useNavigate()
  const { id: auctionId } = useParams()
  const { mutate: writeReview, isPending } = useWriteReview()
  const { data: auction } = useAuctionDetails(auctionId)

  const [content, setContent] = useState('')
  const [score, setScore] = useState(3)
  const { isOpen, open } = useModal()

  const handleSubmit = () => {
    if (content.length > 300) return alert('300자 이내로 작성해주세요.')
    writeReview(
      {
        auctionId,
        content,
        satisfyScore: score,
      },
      {
        onSuccess: () => open(),
        onError: error => alert(error.response.data.message),
      },
    )
    open()
  }

  const handleClose = () => {
    route(ROUTES.HOME, { replace: true })
  }

  const validation = v => VALIDATIONS.maxLength(v, 300)

  if (!auction) return <Spinner />

  return (
    <div>
      <div className='flex flex-col gap-8 p-4'>
        <ProfileSmall user={auction.seller} />
        <div>
          <div className='flex items-center justify-between'>
            <p className='text-ddblue-400 font-bold text-[14px]'>신뢰도</p>
            <span className='text-sm font-bold'>{scoreToText(score)}</span>
          </div>
          <StepTrustBar setScore={setScore} score={score} />
        </div>
        <TextArea
          rows={12}
          value={content}
          setValue={setContent}
          validate={validation}
          label={`리뷰내용 ${content.length}/300`}
          limit={validation}
        />
      </div>
      <StickyContainer plain>
        <DefaultButton
          type={isPending ? 'disabled' : ''}
          onClick={handleSubmit}
        >
          등록
        </DefaultButton>
      </StickyContainer>
      {isOpen && (
        <Modal close={handleClose}>
          <div className='flex flex-col items-center gap-1'>
            <MaterialIcon
              name='check_circle'
              filled
              className='text-ddblue-400'
              size={32}
            />
            <p className='text-lg font-bold text-ddblue-400'>완료</p>
          </div>
          <div className='p-2'>
            <p>소중한 리뷰를 저장했어요.</p>
          </div>
          <DefaultButton onClick={handleClose}>확인</DefaultButton>
        </Modal>
      )}
    </div>
  )
}

export default ReviewRegisterPage
