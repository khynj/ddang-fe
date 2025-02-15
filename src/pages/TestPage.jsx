import { convertDateToUTC } from '@/utils/date'

function TestPage() {
  console.log(new Date('2025-02-12T20:07').toISOString())
  return (
    <div className='flex flex-col gap-2'>
      <div>
        convertDateToUTC()
        <div>{convertDateToUTC(new Date()).toString()}</div>
      </div>
    </div>
  )
}

export default TestPage
