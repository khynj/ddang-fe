import { dday as getDday } from '@/utils/date'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export default function useTimeDDay(initialTime) {
  const [currentTime, setCurrentTime] = useState(new Date().getTime())
  const [time, setTime] = useState(initialTime)
  const [dday, setDday] = useState()
  const queryClient = useQueryClient()

  useEffect(() => {
    const interval = setInterval(() => {
      if (new Date(time).getTime() - new Date().getTime() > 1000 * 60 * 60)
        return
      setCurrentTime(new Date().getTime())
    }, 1000)
    return () => clearInterval(interval)
  }, [time])

  useEffect(() => {
    if (new Date(time).getTime() < currentTime) {
      setDday(false)
      return
    }
    setDday(getDday(time))
  }, [time, currentTime, queryClient, setDday, dday])

  return [dday, setTime]
}
