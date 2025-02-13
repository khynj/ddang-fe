import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'

function InfiniteScrollWrapper({ children, setPage, parentProps }) {
  const scrollRef = useRef()

  useEffect(() => {
    const handleScroll = () => {
      if (
        scrollRef.current.scrollTop + scrollRef.current.clientHeight + 200 >=
        scrollRef.current.scrollHeight
      ) {
        setPage(prevPage => prevPage + 1)
      }
    }

    const currentRef = scrollRef.current
    currentRef.addEventListener('scroll', handleScroll)

    return () => {
      currentRef.removeEventListener('scroll', handleScroll)
    }
  }, [setPage])

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
