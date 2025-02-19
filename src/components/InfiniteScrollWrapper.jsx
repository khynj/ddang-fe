import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'

function InfiniteScrollWrapper({
  children,
  fetchNextPage,
  parentProps,
  isPending,
  isFetching,
}) {
  const scrollRef = useRef()

  useEffect(() => {
    if (!fetchNextPage) return
    const handleScroll = () => {
      if (
        scrollRef.current.scrollTop + scrollRef.current.clientHeight + 1600 >=
        scrollRef.current.scrollHeight
      ) {
        if (isPending || isFetching) return
        fetchNextPage()
      }
    }

    const currentRef = scrollRef.current
    currentRef.addEventListener('scroll', handleScroll)

    return () => {
      currentRef.removeEventListener('scroll', handleScroll)
    }
  }, [fetchNextPage, isPending, isFetching])

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
  fetchNextPage: PropTypes.func,
  parentProps: PropTypes.object,
  isPending: PropTypes.bool,
  isFetching: PropTypes.bool,
}

export default InfiniteScrollWrapper
