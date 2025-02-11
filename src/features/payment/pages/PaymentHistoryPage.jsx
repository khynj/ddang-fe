import usePageName from '@/hooks/usePageName.js'
import { usePayHistory } from '@/apis/pay.js'
import { formatPrice } from '@/utils/formatPrice'

function PaymentHistoryPage() {
  usePageName('결제내역')

  const data = {
    histories: [
      {
        payAccountHistoryId: 4,
        title: '카카오페이 충전',
        changeAmount: 5000,
        balanceAfter: 57020,
        createdTime: '2025-02-11 04:28:43',
      },
      {
        payAccountHistoryId: 3,
        title: '카카오페이 충전',
        changeAmount: 2020,
        balanceAfter: 52020,
        createdTime: '2025-02-11 04:19:05',
      },
      {
        payAccountHistoryId: 2,
        title: '카카오페이 충전',
        changeAmount: 30000,
        balanceAfter: 50000,
        createdTime: '2025-02-11 04:17:43',
      },
      {
        payAccountHistoryId: 1,
        title: '카카오페이 충전',
        changeAmount: 20000,
        balanceAfter: 20000,
        createdTime: '2025-02-11 04:16:27',
      },
    ],
  }
  // const { data } = usePayHistory()
  const transactions = data ? data.histories : []

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
          <h2 className='text-base text-sm text-gray-600 py-2 px-1'>{date}</h2>{' '}
          <div className='flex flex-col gap-2'>
            {sortedTransactionsByDate[date].map(transaction => {
              const time = transaction.createdTime.split(' ')[1].slice(0, 5)
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
    </div>
  )
}

export default PaymentHistoryPage
