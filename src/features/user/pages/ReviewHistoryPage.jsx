import PropTypes from 'prop-types'
import ReviewItem from '../components/ReviewItem'
import { useMemberReviews } from '@/apis/member'
import { useAuth } from '@/contexts/AuthContext'
import Placeholder from '@/components/placeholder/Placeholder'
import Spinner from '@/components/placeholder/Spinner'

function ReviewHistoryPage({ received }) {
  const { user } = useAuth()
  const { data: reviews } = useMemberReviews({
    memberId: user.memberId,
    type: received ? 'received' : 'given',
  })

  if (!reviews) return <Spinner />
  return (
    <>
      {reviews.length > 0 ? (
        reviews.map((review, i) => (
          <ReviewItem key={i} review={review} received={!!received} />
        ))
      ) : (
        <Placeholder>리뷰가 없어요.</Placeholder>
      )}
    </>
  )
}

ReviewHistoryPage.propTypes = {
  received: PropTypes.bool,
}

export default ReviewHistoryPage
