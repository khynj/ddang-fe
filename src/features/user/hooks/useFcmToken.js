import { useState } from 'react'

function useFcmToken() {
  const [fcmToken, setFcmToken] = useState(localStorage.getItem('fcmToken'))

  return fcmToken
}

export default useFcmToken
