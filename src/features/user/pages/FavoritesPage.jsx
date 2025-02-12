import usePageName from '@/hooks/usePageName'
import { ProductListPage } from '@/features'

function FavoritesPage() {
  usePageName('찜 목록')

  return (
    <>
      <ProductListPage filters isFavorite />
    </>
  )
}

export default FavoritesPage
