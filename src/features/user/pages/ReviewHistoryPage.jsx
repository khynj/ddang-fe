import PropTypes from 'prop-types'
import ReviewItem from '../components/ReviewItem'
import REVIEWS from '../data/REVIEWS'

function ReviewHistoryPage({ received }) {
  // id...
  return (
    <>
      {REVIEWS.map((review, i) => (
        <ReviewItem key={i} review={review} received={!!received} />
      ))}
    </>
  )
}

ReviewHistoryPage.propTypes = {
  received: PropTypes.bool,
}

export default ReviewHistoryPage
