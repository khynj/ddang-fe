import { ProductListPage } from '@/features'
import usePageName from '@/hooks/usePageName'

function UserProductListPage() {
  usePageName('판매목록')
  return (
    <>
      <ProductListPage />
    </>
  )
}

export default UserProductListPage
