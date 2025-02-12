import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'

function Slider({ children }) {
  const sliderRef = useRef(null)

  useEffect(() => {
    console.dir(sliderRef.current)
  }, [sliderRef])
  return (
    <div
      ref={sliderRef}
      className='flex flex-row flex-nowrap overflow-x-scroll snap-x snap-mandatory'
    >
      {children}
    </div>
  )
}

Slider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Slider
