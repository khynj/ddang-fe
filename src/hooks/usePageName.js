import { useEffect } from 'react'
import { useOutletContext } from 'react-router'

export default function usePageName(title) {
  const { setTitle } = useOutletContext()
  useEffect(() => {
    setTitle(title)
  }, [setTitle, title])
}
