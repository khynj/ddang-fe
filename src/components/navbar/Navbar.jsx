import { NavLink } from 'react-router'
import style from './Navbar.module.css'
import NavButton from './NavButton'
import ROUTES from '../../data/ROUTES'

function Navbar() {
  const getClassName = ({ isActive }) => {
    return `w-1/5 ${isActive ? 'text-gray-900' : 'text-gray-500'}`
  }
  const navs = [
    { replace: true, to: ROUTES.HOME, iconName: 'home', text: '홈', end: true },
    {
      replace: true,
      to: ROUTES.SEARCH,
      iconName: 'manage_search',
      text: '물건찾기',
    },
    {
      replace: false,
      to: ROUTES.PRODUCT_REGISTER,
      iconName: 'add',
      text: '등록',
    },
    {
      replace: true,
      to: ROUTES.MY_PRODUCTS,
      iconName: 'gavel',
      text: '경매현황',
    },
    { replace: true, to: ROUTES.MYPAGE, iconName: 'person', text: '마이' },
  ]
  return (
    <nav
      className={`fixed h-[64px] max-w-lg w-full bottom-0
         flex grow flex-row justify-around items-center bg-white ${style.navbar}`}
    >
      {navs.map((nav, index) => (
        <NavLink
          key={index}
          className={getClassName}
          to={nav.to}
          end={nav.end}
          replace={nav.replace}
        >
          <NavButton iconName={nav.iconName}>{nav.text}</NavButton>
        </NavLink>
      ))}
    </nav>
  )
}

export default Navbar
