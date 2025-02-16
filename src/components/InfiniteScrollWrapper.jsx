import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'

function InfiniteScrollWrapper({
  children,
  fetchNextPage,
  parentProps,
  isPending,
}) {
  const scrollRef = useRef()

  useEffect(() => {
    if (!fetchNextPage) return
    const handleScroll = () => {
      if (
        scrollRef.current.scrollTop + scrollRef.current.clientHeight + 400 >=
        scrollRef.current.scrollHeight
      ) {
        console.log('fetchNextPage')
        if (isPending) return
        fetchNextPage()
      }
    }

    const currentRef = scrollRef.current
    currentRef.addEventListener('scroll', handleScroll)

    return () => {
      currentRef.removeEventListener('scroll', handleScroll)
    }
  }, [fetchNextPage, isPending])

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
}

export default InfiniteScrollWrapper
