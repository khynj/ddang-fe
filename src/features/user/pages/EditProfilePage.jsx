import EditProfileImage from '../components/EditProfileImage'
import usePageName from '@/hooks/usePageName'
import TextInput from '@/components/form/TextInput'
import StickyContainer from '../../../components/StickyContainer'
import DefaultButton from '../../../components/buttons/DefaultButton'
import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'
import {
  useCheckDuplicate,
  useMemberInfo,
  useUpdateNickname,
  useUpdateProfilePhoto,
} from '@/apis/member'
import { useNavigate } from 'react-router'
import ROUTES from '@/data/ROUTES'
import { VALIDATIONS } from '@/utils/VALIDATIONS'

function EditProfilePage() {
  usePageName('프로필 수정')
  const { user } = useAuth()
  const [nickname, setNickname] = useState(user?.nickname)
  const { data: userData } = useMemberInfo(user?.memberId)
  const [blob, setBlob] = useState(null)

  const { mutate: updatePhotoMutation } = useUpdateProfilePhoto()
  const checkNickname = useCheckDuplicate({ email: '', nickname })
  const { mutate: updateNickname } = useUpdateNickname()

  const route = useNavigate()

  const onSubmitPhoto = () => {
    const formData = new FormData()
    formData.append('photo', blob)
    updatePhotoMutation(formData, {
      onSuccess: () => {
        alert('프로필 사진을 수정했어요.')
      },
      onError: error => {
        console.log('실패', error.data.message)
      },
    })
  }

  const onSubmitNickname = () => {
    if (nickname === user?.nickname) return alert('새로운 별명을 입력해주세요.')

    updateNickname(nickname, {
      onSuccess: () => {
        alert('별명을 수정했어요.')
      },
      onError: error => {
        console.log('실패', error.data.message)
      },
    })
  }

  if (!userData) return null

  const validation = nickname =>
    nickname != user.nickname && checkNickname.data?.nicknameExists
      ? '이미 존재하는 별명이에요.'
      : VALIDATIONS.nickname(nickname) ||
        VALIDATIONS.required(nickname) ||
        VALIDATIONS.maxLength(nickname, 20)

  return (
    <>
      <div className='flex flex-col bg-white p-4 pt-12 gap-8'>
        <EditProfileImage
          src={userData?.imageUrl}
          setBlob={setBlob}
          size={120}
        />
        <DefaultButton onClick={onSubmitPhoto}>수정 완료</DefaultButton>

        <hr className='py-2 border-0' />

        <TextInput
          label='별명'
          required
          value={nickname}
          setValue={setNickname}
          validate={validation}
        />
        <DefaultButton onClick={onSubmitNickname}>별명 수정</DefaultButton>
      </div>
    </>
  )
}

export default EditProfilePage
