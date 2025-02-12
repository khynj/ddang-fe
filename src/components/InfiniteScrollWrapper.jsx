import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'

function InfiniteScrollWrapper({ children, page = 1, setPage, parentProps }) {
  const scrollRef = useRef()

  useEffect(() => {
    scrollRef.current.addEventListener('scroll', () => {
      if (
        scrollRef.current.scrollTop + scrollRef.current.clientHeight + 300 >=
        scrollRef.current.scrollHeight
      ) {
        setPage(page + 1)
      }
    })
  }, [page, setPage])

  return (
    <div
      {...parentProps}
      ref={scrollRef}
      className='flex flex-col grow overflow-y-scroll'
    >
      {children}
    </div>
  )
}

InfiniteScrollWrapper.propTypes = {
  children: PropTypes.node,
  page: PropTypes.number,
  setPage: PropTypes.func.isRequired,
  parentProps: PropTypes.object,
}

export default InfiniteScrollWrapper
