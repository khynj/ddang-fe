import usePageName from '@/hooks/usePageName.js'
import { usePayHistory } from '@/apis/pay.js'
import { formatPrice } from '@/utils/formatPrice'
import { useState } from 'react'
import DefaultButton from '@/components/buttons/DefaultButton'

function PaymentHistoryPage() {
  usePageName('결제내역')
  const [page, setPage] = useState(1)
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = usePayHistory({
    page,
    size: 10,
  })

  if (!data || data.pages[0].histories.length === 0) {
    return (
      <div className='flex justify-center items-center h-full'>
        <div className='text-center text-gray-700'>결제 내역이 없습니다.</div>
      </div>
    )
  }

  const transactions = data.pages.flatMap(page => page.histories)

  const transactionsByDate = transactions.reduce((acc, transaction) => {
    const dateObj = new Date(transaction.createdTime)
    const dateKey = dateObj.toISOString().split('T')[0]

    if (!acc[dateKey]) acc[dateKey] = []
    acc[dateKey].push(transaction)
    return acc
  }, {})

  const sortedTransactionsByDate = Object.entries(transactionsByDate)
    .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
    .reduce((acc, [date, transactions]) => {
      const dateObj = new Date(date)
      const formattedDate = `${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`
      acc[formattedDate] = transactions
      return acc
    }, {})

  return (
    <div className='flex flex-col p-4'>
      {Object.keys(sortedTransactionsByDate).map(date => (
        <div key={date}>
          <h2 className='text-base text-sm text-gray-600 py-2 px-1'>{date}</h2>
          <div className='flex flex-col gap-2'>
            {sortedTransactionsByDate[date].map(transaction => {
              const time = new Date(transaction.createdTime).toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
              })
              return (
                <div
                  key={transaction.payAccountHistoryId}
                  className='flex flex-col gap-0 py-2 px-2'
                >
                  <div className='flex justify-between items-center'>
                    <div className='text-base text-gray-900 font-bold'>
                      {transaction.title}
                    </div>
                    <div
                      className={`font-bold text-base ${
                        transaction.changeAmount > 0
                          ? 'text-ddblue-400'
                          : 'text-gray-900'
                      }`}
                    >
                      {transaction.changeAmount > 0
                        ? `+${formatPrice(transaction.changeAmount)}원`
                        : `${formatPrice(transaction.changeAmount)}원`}
                    </div>
                  </div>
                  <div className='flex justify-between items-center text-sm text-gray-800'>
                    <div>{time}</div>
                    <div>{formatPrice(transaction.balanceAfter)}원</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
      {hasNextPage && (
        <DefaultButton
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mt-4"
        >
          {isFetchingNextPage ? '로딩중...' : '더보기'}
        </DefaultButton>
      )}
    </div>
  )
}

export default PaymentHistoryPage
