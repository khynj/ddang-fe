import usePageName from '@/hooks/usePageName'
import { useParams } from 'react-router'
import Profile from '../components/Profile'
import ProfileSection from '../components/ProfileSection'
import ROUTES from '@/data/ROUTES'
import ProductItemHorizontalSmall from '@/features/product/components/ProductItemHorizontalSmall'
import ReviewItem from '../components/ReviewItem'
import { useMemberInfo, useMemberReviews } from '@/apis/member'
import { useSearchAuctions } from '@/apis/auction'
import InlinePlaceholder from '@/components/placeholder/InlinePlaceholder'
import Spinner from '@/components/placeholder/Spinner'
import InlineSpinner from '@/components/placeholder/InlineSpinner'

function ProfilePage() {
  usePageName('프로필')
  const { id } = useParams()
  const { data: userData } = useMemberInfo(id)
  const { data: products } = useSearchAuctions({ sellerId: id })
  const { data: reviews, isPending } = useMemberReviews({
    memberId: id,
  })

  if (!userData) return <Spinner />

  return (
    <div>
      <Profile userData={userData} />
      {!products ? (
        <InlineSpinner />
      ) : (
        <ProfileSection
          title='판매 상품'
          to={ROUTES.PRODUCT_LIST_BY_USER.replace(':id', id)}
        >
          {products.pages[0].auctionDetailProjection
            .slice(0, 3)
            .map((product, i) => (
              <ProductItemHorizontalSmall key={i} product={product} />
            ))}
        </ProfileSection>
      )}
      {
        <ProfileSection title='리뷰' to={`${ROUTES.REVIEW_HISTORY}/${id}`}>
          {isPending ? (
            <InlineSpinner />
          ) : reviews.length > 0 ? (
            reviews
              .slice(0, 3)
              .map((review, i) => (
                <ReviewItem key={i} review={review} received />
              ))
          ) : (
            <InlinePlaceholder>리뷰가 없어요.</InlinePlaceholder>
          )}
        </ProfileSection>
      }
    </div>
  )
}

export default ProfilePage
