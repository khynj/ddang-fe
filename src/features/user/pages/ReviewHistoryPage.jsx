import TabBar from '../../../components/navbar/TabBar'
import usePageName from '../../../hooks/usePageName'
import Review from '../components/ReviewItem'
import REVIEWS from '../data/REVIEWS'

function ReviewHistory() {
  usePageName('리뷰내역')

  return (
    <>
      <TabBar
        className='text-sm'
        routes={[
          { to: 'received', name: '받은 리뷰' },
          { to: 'written', name: '작성한 리뷰' },
        ]}
      />
      <div>
        {REVIEWS.map((review, index) => (
          <Review review={review} key={index} />
        ))}
      </div>
    </>
  )
}

export default ReviewHistory
