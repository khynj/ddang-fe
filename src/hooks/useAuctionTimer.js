import { useState, useEffect, useMemo } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { formatTimeDiff } from '@/utils/date'
import { getAuctionNextTime, getAuctionStatus } from '@/utils/auction'

export const useAuctionTimer = (auction, invalidateKeys) => {
  const queryClient = useQueryClient()
  const status = getAuctionStatus(auction)
  const targetTime = getAuctionNextTime(auction)
  const [tick, setTick] = useState(0)

  const leftTime = useMemo(() => {
    tick
    return new Date(targetTime).getTime() - new Date().getTime()
  }, [tick, targetTime])

  useEffect(() => {
    // queryClient.invalidateQueries(invalidateKeys)
  }, [status, queryClient, invalidateKeys])

  const auctionTimeString = useMemo(() => {
    if (status == 0) return `${formatTimeDiff(leftTime)} 후 시작`
    if (status == 1) return `${formatTimeDiff(leftTime)} 남음`
    return '경매 종료됨'
  }, [status, leftTime])

  useEffect(() => {
    const timer = setInterval(() => {
      setTick(tick => tick + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return auctionTimeString
}
