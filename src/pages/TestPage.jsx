import DefaultButton from '@/components/buttons/DefaultButton'
import TextInput from '@/components/form/TextInput'
import { useEffect, useState } from 'react'

function TestPage() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')
  const [height, setHeight] = useState(window.visualViewport.height)
  useEffect(() => {
    window.onresize = () => {
      setHeight(window.visualViewport.height)
    }
  }, [])
  return (
    <div className='p-4'>
      <DefaultButton onClick={() => setCount(count + 1)}>{count}</DefaultButton>
      <TextInput value={text} setValue={setText} />
      {height}
    </div>
  )
}

export default TestPage
