import EditProfileImage from '../components/EditProfileImage'
import usePageName from '@/hooks/usePageName'
import TextInput from '@/components/form/TextInput'
import StickyContainer from '../../../components/StickyContainer'
import DefaultButton from '../../../components/buttons/DefaultButton'
import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'
import { useMemberInfo, useUpdateProfilePhoto } from '@/apis/member'
import { useNavigate } from 'react-router'
import ROUTES from '@/data/ROUTES'

function EditProfilePage() {
  usePageName('프로필 수정')
  const { user } = useAuth()
  const [nickname, setNickname] = useState(user?.nickname)
  const { data: userData } = useMemberInfo(user?.memberId)
  const [blob, setBlob] = useState(null)

  const updatePhotoMutation = useUpdateProfilePhoto()
  const route = useNavigate()
  const onSubmit = () => {
    const formData = new FormData()
    formData.append('photo', blob)
    updatePhotoMutation.mutate(formData, {
      onSuccess: () => {
        console.log('성공')
        route(ROUTES.MYPAGE)
      },
      onError: err => {
        console.log('실패', err)
      },
    })
  }
  if (!userData) return null
  return (
    <>
      <div className='flex flex-col bg-white p-4 pt-16 gap-8'>
        <EditProfileImage
          src={userData?.imageUrl}
          setBlob={setBlob}
          size={120}
        />
        {/* <p>{userData.email}</p> */}
        <TextInput
          label='별명'
          required
          value={nickname}
          setValue={setNickname}
        />
      </div>
      <StickyContainer plain>
        <DefaultButton onClick={onSubmit}>수정</DefaultButton>
      </StickyContainer>
    </>
  )
}

export default EditProfilePage
