import usePageName from '@/hooks/usePageName'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import USER from '../data/USER'

function ProfilePage() {
  usePageName('프로필')
  const { id } = useParams()
  const [user, setUser] = useState(null)
  useEffect(() => {
    // get user data by id
    setUser(USER)
  }, [])
  return <div>profile page</div>
}

export default ProfilePage
