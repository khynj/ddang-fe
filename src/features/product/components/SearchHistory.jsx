import PropTypes from 'prop-types'
import MaterialIcon from '@/components/icons/MaterialIcon'
import { useDeleteAuctionSearchHistory } from '@/apis/auction'
import { Link } from 'react-router'
import ROUTES from '@/data/ROUTES'
import { useQueryClient } from '@tanstack/react-query'

function SearchHistory({ id, text }) {
  const queryClient = useQueryClient()

  const { mutate: deleteSearchHistory } = useDeleteAuctionSearchHistory()

  const deleteHistory = e => {
    e.preventDefault()
    deleteSearchHistory(id, {
      onSuccess: () => {
        queryClient.invalidateQueries('auctionSearchHistory')
      },
    })
  }
  return (
    <Link
      to={ROUTES.PRODUCT_LIST + '?searchKey=' + text}
      className='flex items-center justify-between py-1.5 px-3 text-gray-800
    bg-gray-50 m-1 mx-3 rounded-xl'
    >
      <p to={ROUTES.PRODUCT_LIST}>{text}</p>
      <button onClick={deleteHistory}>
        <MaterialIcon name='close' size={20} />
      </button>
    </Link>
  )
}

SearchHistory.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
}

export default SearchHistory
