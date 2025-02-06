import usePageName from '@/hooks/usePageName'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import USER from '../data/USER'
import Profile from '../components/Profile'
import ProfileSection from '../components/ProfileSection'
import ROUTES from '@/data/ROUTES'
import products from '@/features/product/data/products'
import ProductItemHorizontalSmall from '@/features/product/components/ProductItemHorizontalSmall'
import REVIEWS from '../data/REVIEWS'
import ReviewItem from '../components/ReviewItem'

function ProfilePage() {
  usePageName('프로필')
  const { id } = useParams()
  const [user, setUser] = useState(null)
  useEffect(() => {
    // get user data by id
    setUser(USER)
  }, [])

  if (!user) return null

  return (
    <div>
      <Profile
        name={user.nickname}
        trustScore={user.reliability}
        profileSrc={user.imageUrl}
      />
      <ProfileSection
        title='판매 상품'
        to={ROUTES.PRODUCT_LIST_BY_USER.replace(':id', id)}
      >
        {products.slice(0, 3).map((product, i) => (
          <ProductItemHorizontalSmall key={i} product={product} />
        ))}
      </ProfileSection>
      <ProfileSection title='리뷰' to={`${ROUTES.REVIEW_HISTORY}/${id}`}>
        {REVIEWS.slice(0, 3).map((review, i) => (
          <ReviewItem key={i} review={review} received />
        ))}
      </ProfileSection>
    </div>
  )
}

export default ProfilePage
