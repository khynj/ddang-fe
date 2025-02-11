import DefaultButton from '@/components/buttons/DefaultButton'
import TextInput from '@/components/form/TextInput'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

function TestPage() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')
  console.log(window.innerHeight)
  useEffect(() => {
    console.log(window.innerHeight)
  }, [])
  return (
    <div className='p-4'>
      <DefaultButton onClick={() => setCount(count + 1)}>{count}</DefaultButton>
      <TextInput value={text} setValue={setText} />
    </div>
  )
}

export default TestPage
