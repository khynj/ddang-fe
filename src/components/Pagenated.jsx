import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'

function Pagenated({ children, page = 1, setPage, parentProps }) {
  const scrollRef = useRef()

  console.log('Pagenated')

  useEffect(() => {
    scrollRef.current.addEventListener('scroll', () => {
      console.log('scrolled!')
      if (
        scrollRef.current.scrollTop + scrollRef.current.clientHeight + 100 >=
        scrollRef.current.scrollHeight
      ) {
        setPage(page + 1)
      }
    })
  }, [])

  return (
    <div {...parentProps} ref={scrollRef} className='overflow-y-scroll'>
      {children}
    </div>
  )
}

Pagenated.propTypes = {
  children: PropTypes.node,
  page: PropTypes.number,
  setPage: PropTypes.func,
  parentProps: PropTypes.object,
}

export default Pagenated
