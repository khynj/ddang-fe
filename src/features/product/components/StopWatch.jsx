import { shortRelativeTime } from '@/utils/date'
import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from 'react'

export function StopWatch({ initTime }) {
  const time = new Date(initTime).getTime()
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

  return <>{timeString}</>
}

StopWatch.propTypes = {
  initTime: PropTypes.any,
}
