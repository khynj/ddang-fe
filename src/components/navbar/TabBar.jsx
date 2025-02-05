import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

function TabBar({ routes }) {
  const getClassName = ({ isActive }) => `
  text-center px-2 pt-2 pb-1 font-bold text-sm ${
    isActive ? 'border-b-2 border-gray-950' : 'border-0'
  }
    `
  return (
    <div className={'flex gap-2 px-4 py-2'}>
      {routes.map((route, index) => (
        <NavLink
          key={index}
          to={route.to}
          className={getClassName}
          end={route.end}
          replace
        >
          {route.name}
        </NavLink>
      ))}
    </div>
  )
}

TabBar.propTypes = {
  routes: PropTypes.array.isRequired,
}

export default TabBar
