// useModal
import { useState } from 'react'

export default function useModal(initialValue = 'abc') {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(initialValue)

  const open = () => setIsOpen(true)
  const close = v => {
    if (v != undefined) setValue(v)
    setIsOpen(false)
  }

  return { isOpen, open, close, value }
}
