import MaterialIcon from '@/components/icons/MaterialIcon'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

function ProfileSection({ title, to, children }) {
  return (
    <div className='mb-2'>
      <Link
        to={to}
        className='flex items-center justify-between px-4 pt-2 pb-1'
      >
        <p className='font-bold'>{title}</p>
        <MaterialIcon
          name='chevron_right'
          wght={300}
          className='text-gray-600'
        />
      </Link>
      <div>{children}</div>
    </div>
  )
}

ProfileSection.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string,
  children: PropTypes.node,
}

export default ProfileSection
