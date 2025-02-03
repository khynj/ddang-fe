import PropTypes from 'prop-types'
import MaterialIcon from './icons/MaterialIcon'

function FilterBar({ children }) {
  return (
    <div className='flex px-4 pt-3 pb-2 justify-between items-center'>
      <div className='flex gap-1 h-8'>{children}</div>
      <div className='font-bold text-sm flex gap-1 items-center text-gray-950'>
        <MaterialIcon name='sort' size={18} />
        <div>최신순</div>
      </div>
    </div>
  )
}

FilterBar.propTypes = {
  children: PropTypes.node,
}

export default FilterBar
