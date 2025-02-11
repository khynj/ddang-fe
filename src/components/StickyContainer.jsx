import PropTypes from 'prop-types'

function StickyContainer({ children, plain, rounded }) {
  return (
    <div
      className={`max-w-lg fixed bottom-0 w-full p-4 bg-white ${
        plain ? '' : 'border-t border-gray-200'
      } ${rounded ? 'rounded-t-xl' : ''}`}
      style={{
        boxShadow: rounded ? '0 0px 4px rgba(0, 0, 0, 0.25)' : '',
      }}
    >
      {children}
    </div>
  )
}

StickyContainer.propTypes = {
  children: PropTypes.node.isRequired,
  plain: PropTypes.bool,
  rounded: PropTypes.bool,
}

export default StickyContainer
