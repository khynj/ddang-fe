import { dday } from '@/utils/date'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'

export default function useEndTimeDDay(endTime) {
  const [currentTime, setCurrentTime] = useState(new Date().getTime())
  const queryClient = useQueryClient()

  const endTimeDDay = useMemo(() => {
    if (new Date(endTime).getTime() < currentTime) {
      queryClient.invalidateQueries(['searchAuctions'])
      return false
    }
    return dday(endTime)
  }, [currentTime, endTime, queryClient])

  useEffect(() => {
    if (!endTime || !currentTime) return
    if (new Date(endTime).getTime() - currentTime > 1000 * 60 * 60) return
    const interval = setInterval(() => {
      setCurrentTime(new Date().getTime())
      console.log('interval')
    }, 1000)
    return () => clearInterval(interval)
  }, [currentTime, endTime])

  return endTimeDDay
}
