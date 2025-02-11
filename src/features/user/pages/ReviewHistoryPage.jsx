import PropTypes from 'prop-types'
import ReviewItem from '../components/ReviewItem'
import { useMemberReviews } from '@/apis/member'
import { useAuth } from '@/contexts/AuthContext'
import { useMemo } from 'react'

function ReviewHistoryPage({ received }) {
  const { user } = useAuth()
  const { data: reviews_as_buyer } = useMemberReviews({
    memberId: user.memberId,
    type: received ? 'received' : 'given',
    role: 'buyer',
  })
  const { data: reviews_as_seller } = useMemberReviews({
    memberId: user.memberId,
    type: received ? 'received' : 'given',
    role: 'seller',
  })

  const reviews = useMemo(() => {
    const reviews = []
    if (reviews_as_buyer) reviews.push(...reviews_as_buyer)
    if (reviews_as_seller) reviews.push(...reviews_as_seller)
    reviews.sort(
      (a, b) => new Date(b.review.createdAt) - new Date(a.review.createdAt),
    )
    return reviews
  }, [reviews_as_buyer, reviews_as_seller])

  return (
    <>
      {reviews?.map((review, i) => (
        <ReviewItem key={i} review={review} received={!!received} />
      ))}
    </>
  )
}

ReviewHistoryPage.propTypes = {
  received: PropTypes.bool,
}

export default ReviewHistoryPage
