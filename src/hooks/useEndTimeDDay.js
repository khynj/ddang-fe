import { dday } from '@/utils/date'
import { useEffect, useMemo, useState } from 'react'

export default function useEndTimeDDay(endTime) {
  const [currentTime, setCurrentTime] = useState(new Date().getTime())

  const endTimeDDay = useMemo(() => {
    console.log(new Date(endTime).toString(), new Date(currentTime).toString())
    console.log(new Date(endTime).toString() < new Date(currentTime).toString())
    if (new Date(endTime).getTime() < currentTime) return false
    return dday(endTime)
  }, [currentTime, endTime])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().getTime())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return endTimeDDay
}
