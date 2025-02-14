import { useCategory } from '@/apis/auction'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import ROUTES from '@/data/ROUTES'

function CategoryList({ category }) {
  const { data: subCategories } = useCategory(category.categoryId)

  return (
    <>
      {subCategories?.map((subCategory) => (
        <Link
          to={`${ROUTES.PRODUCT_LIST}?categoryId=${subCategory.categoryId}&categoryName=${subCategory.name}`}
          key={subCategory.categoryId}
          className='w-[30%]'
        >
          <div className="aspect-square overflow-hidden rounded-xl">
            <img 
              src={subCategory.imageUrl}
              alt={subCategory.name}
              className='w-full h-full object-cover'
              onError={(e) => {
                e.target.onerror = null
                e.target.src = '/default-category-image.jpg' // 기본 이미지 경로
              }}
            />
          </div>
          <p className='text-center mt-2 text-sm'>{subCategory.name}</p>
        </Link>
      ))}
    </>
  )
}

CategoryList.propTypes = {
  category: PropTypes.object.isRequired,
}

export default CategoryList
