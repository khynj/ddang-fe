import usePageName from '@/hooks/usePageName'

function ChargeSuccessPage() {
  usePageName('충전 완료')
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <img src='' alt='' />
      <p className='font-bold'>충전 완료 !</p>
    </div>
  )
}

export default ChargeSuccessPage
