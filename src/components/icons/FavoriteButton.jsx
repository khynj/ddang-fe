import PropTypes from 'prop-types'
import { useState } from 'react'
import MaterialIcon from './MaterialIcon'

function FavoriteButton({ liked, size, onClick }) {
  const [animate, setAnimate] = useState(false)

  const style = {
    filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))',
    transition: 'color 0.1s, transform 0.15s ease-in-out',
    transform: animate ? 'scale(1.2)' : 'scale(1)',
  }

  const clickHandler = e => {
    e.preventDefault()
    setAnimate(true)
    setTimeout(() => setAnimate(false), 150) // Remove animation after 300ms
    onClick()
  }

  return (
    <button onClick={clickHandler}>
      <MaterialIcon
        name='favorite'
        className={liked ? 'text-ddred-500' : 'text-gray-200'}
        filled
        size={size}
        style={style}
      />
    </button>
  )
}

FavoriteButton.propTypes = {
  liked: PropTypes.bool,
  size: PropTypes.number,
  onClick: PropTypes.func,
}

export default FavoriteButton
