import { useAuctionDetails } from '@/apis/auction'
import usePageName from '@/hooks/usePageName'
import { useNavigate, useParams } from 'react-router'
import product from '@/features/product/data/product'
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

function ReviewRegisterPage() {
  usePageName('리뷰 작성')
  const route = useNavigate()
  const { id: productId } = useParams()
  // const { data: product } = useAuctionDetails(productId)

  const [review, setReview] = useState('')
  const { isOpen, open, close } = useModal()

  const handleSubmit = () => {
    // enroll review
    open()
  }

  const handleClose = () => {
    close()
    route(ROUTES.HOME)
  }

  return (
    <div>
      <div className='flex flex-col gap-8 p-4'>
        <ProfileSmall user={product.seller} />
        <div>
          <div className='flex items-center justify-between'>
            <p className='text-ddblue-400 font-bold text-[14px]'>신뢰도</p>
            <span className='text-sm font-bold'>보통</span>
          </div>
          <StepTrustBar />
        </div>
        <TextArea rows={12} value={review} setValue={setReview} />
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
