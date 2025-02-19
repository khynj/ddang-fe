import { shortRelativeTime } from '@/utils/date'
import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from 'react'

function ChatroomTime({ time }) {
  const [tick, setTick] = useState(0)
  const timeString = useMemo(() => {
    tick
    return shortRelativeTime(time)
  }, [time, tick])

  useEffect(() => {
    const timer = setInterval(() => {
      setTick(tick => tick + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  return <div className='text-gray-500 text-sm shrink-0'>{timeString}</div>
}

ChatroomTime.propTypes = {
  time: PropTypes.any,
}

export default ChatroomTime
