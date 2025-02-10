import handstandingMole from '@/assets/images/handstandingMole.png'
import EditProfileImage from '../components/EditProfileImage'
import usePageName from '@/hooks/usePageName'
import TextInput from '@/components/form/TextInput'
import StickyContainer from '../../../components/StickyContainer'
import DefaultButton from '../../../components/buttons/DefaultButton'
import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'

function EditProfilePage() {
  usePageName('프로필 수정')
  const { user } = useAuth()
  const [nickname, setNickname] = useState(user?.nickname)

  return (
    <>
      <div className='flex flex-col bg-white p-4 pt-16 gap-8'>
        <EditProfileImage src={handstandingMole} size={120} />
        <TextInput
          label='별명'
          required
          value={nickname}
          setValue={setNickname}
        />
      </div>
      <StickyContainer plain>
        <DefaultButton>수정</DefaultButton>
      </StickyContainer>
    </>
  )
}

export default EditProfilePage
