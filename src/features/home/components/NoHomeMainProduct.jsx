import trademark from '@/assets/images/characters/trademark.png'
import ROUTES from '@/data/ROUTES'
import { Link } from 'react-router'

function NoHomeMainProduct() {
  return (
    <Link
      to={ROUTES.SEARCH}
      className='relative aspect-square w-full flex-shrink-0 snap-center'
    >
      <div className='relative bg-white brightness-96'>
        <img
          src={trademark}
          alt='product'
          className='aspect-square w-full object-contain'
        />
      </div>
      <div
        className='absolute z-1 w-full bottom-0 px-3 py-3 text-white'
        style={{ backgroundColor: '#00000080' }}
      >
        <p className='flex justify-between text-sm text-gray-50'>
          추천 상품이 없어요. 🥲
        </p>
        <p className='text-lg font-bold text-gray-100 mt-4'>
          다양한 중고 경매를 탐색해보세요.
        </p>
      </div>
    </Link>
  )
}

export default NoHomeMainProduct
