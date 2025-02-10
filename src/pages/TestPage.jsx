import DefaultButton from '@/components/buttons/DefaultButton'
import { useState } from 'react'

function TestPage() {
  const [count, setCount] = useState(0)
  console.log(count)
  return (
    <div>
      Test Page
      <p>{count}</p>
      <DefaultButton onClick={() => setCount(count + 1)}>Click</DefaultButton>
    </div>
  )
}

export default TestPage
