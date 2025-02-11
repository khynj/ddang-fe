import DefaultButton from '@/components/buttons/DefaultButton'
import { useState } from 'react'
import { useSearchParams } from 'react-router'

function TestPage() {
  const [count, setCount] = useState(0)
  console.log(count)
  const [searchParams] = useSearchParams()
  console.log(searchParams.get('asd'))
  return (
    <div>
      Test Page
      <p>{count}</p>
      <DefaultButton onClick={() => setCount(count + 1)}>Click</DefaultButton>
    </div>
  )
}

export default TestPage
