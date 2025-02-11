import DefaultButton from '@/components/buttons/DefaultButton'
import TextInput from '@/components/form/TextInput'
import { useState } from 'react'

function TestPage() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')
  return (
    <div className='p-4'>
      <DefaultButton onClick={() => setCount(count + 1)}>{count}</DefaultButton>
      <TextInput value={text} setValue={setText} />
    </div>
  )
}

export default TestPage
