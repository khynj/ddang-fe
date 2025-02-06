import usePageName from '@/hooks/usePageName.js'
import transactions from '../data/transactions.js'
/** data
{
  payAccountHistoryId: 4,
  title: '3년 된 라디오',
  chageAmount: 150000,
  balanceAfter: 1000000,
  changedTime: '2025-01-20 06:30:00',
}
 */

function PaymentHistoryPage() {
  usePageName('결제내역')

  const transactionsByDate = transactions.reduce((acc, transaction) => {
    const dateObj = new Date(transaction.changedTime)
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
              const time = transaction.changedTime.split(' ')[1].slice(0, 5)
              return (
                <div
                  key={transaction.payAccountHistoryId}
                  className='flex flex-col gap-0 py-2 px-2'
                >
                  <div className='flex justify-between items-center'>
                    <div className='text-base text-gray-900 font-semibold'>
                      {transaction.title}
                    </div>
                    <div
                      className={`font-bold text-base ${
                        transaction.chageAmount > 0
                          ? 'text-ddblue-400'
                          : 'text-gray-900'
                      }`}
                    >
                      {transaction.chageAmount > 0
                        ? `+${transaction.chageAmount.toLocaleString()}원`
                        : `${transaction.chageAmount.toLocaleString()}원`}
                    </div>
                  </div>
                  <div className='flex justify-between items-center text-sm text-gray-800'>
                    <div>{time}</div>
                    <div>{transaction.balanceAfter.toLocaleString()}원</div>
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
