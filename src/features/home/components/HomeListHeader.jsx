import PropTypes from 'prop-types'
import MaterialIcon from '@/components/icons/MaterialIcon'
import { Link } from 'react-router'

function HomeListHeader({ title, icon, to }) {
  return (
    <Link
      className='flex flex-row items-center justify-between py-4 text-gray-900'
      to={to}
    >
      <div className='flex flex-row items-center gap-2'>
        <MaterialIcon name={icon} size={22} filled />
        <span className='text-sm font-bold'>{title}</span>
      </div>
      <MaterialIcon name='chevron_right' size={24} />
    </Link>
  )
}

HomeListHeader.propTypes = {
  title: PropTypes.string,
  to: PropTypes.string,
  icon: PropTypes.string,
}

export default HomeListHeader
