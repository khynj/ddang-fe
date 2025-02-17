import { ProductListPage } from '@/features'
import usePageName from '@/hooks/usePageName'
import { useParams } from 'react-router'

function UserProductListPage() {
  usePageName('판매목록')
  const id = useParams().id
  return (
    <>
      <ProductListPage sellerId={id} />
    </>
  )
}

export default UserProductListPage
