import PropTypes from 'prop-types'
import MaterialIcon from './MaterialIcon'

function FavoriteButton({ liked, size, onClick }) {
  const style = {
    filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))',
  }

  const clickHandler = e => {
    e.preventDefault()
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
