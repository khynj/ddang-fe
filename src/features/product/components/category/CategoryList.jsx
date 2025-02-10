import { useCategory } from '@/apis/auction'
import PropTypes from 'prop-types'
import bag from '@/assets/images/categories/bag.jpeg'

function CategoryList({ category }) {
  const { data: subCategories } = useCategory(category.categoryId)
  return (
    <>
      {subCategories?.map((subCategory, index) => (
        <div key={index} className='w-[30%]'>
          <img src={bag} alt='' className='rounded-xl' />
          {/* <img src={subCategory.imageUrl} alt='' className='rounded-xl' /> */}
          <p className='text-center mt-1'>{subCategory.name}</p>
        </div>
      ))}{' '}
    </>
  )
}

CategoryList.propTypes = {
  category: PropTypes.object.isRequired,
}

export default CategoryList
