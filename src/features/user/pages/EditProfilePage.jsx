import EditProfileImage from '../components/EditProfileImage'
import usePageName from '@/hooks/usePageName'
import TextInput from '@/components/form/TextInput'
import DefaultButton from '@/components/buttons/DefaultButton'
import { useAuth } from '@/contexts/AuthContext'
import { useEffect, useState } from 'react'
import {
  useCheckDuplicate,
  useMemberInfo,
  useUpdateNickname,
  useUpdateProfilePhoto,
} from '@/apis/member'
import { VALIDATIONS } from '@/utils/VALIDATIONS'
import Spinner from '@/components/placeholder/Spinner'

function EditProfilePage() {
  usePageName('프로필 수정')
  const { user, setUser } = useAuth()
  const [blob, setBlob] = useState(null)
  const [nickname, setNickname] = useState(user.nickname)
  const [isPhotoChanged, setIsPhotoChanged] = useState(false)
  const [isNicknameChanged, setIsNicknameChanged] = useState(false)

  const { data: userData } = useMemberInfo(user.memberId)
  const { mutate: updatePhotoMutation } = useUpdateProfilePhoto()
  const checkNickname = useCheckDuplicate({ email: '', nickname })
  const { mutate: updateNickname } = useUpdateNickname()

  useEffect(() => {
    console.log('nickname', nickname)
    console.log('user.nickname', user.nickname)
    if (nickname != user.nickname) setIsNicknameChanged(true)
    else setIsNicknameChanged(false)
  }, [nickname, user.nickname])

  const onSubmitPhoto = () => {
    if (!blob) return alert('새로운 사진을 선택해주세요.')
    const formData = new FormData()
    formData.append('photo', blob)
    updatePhotoMutation(formData, {
      onSuccess: () => {
        alert('프로필 사진을 수정했어요.')
        setIsPhotoChanged(false)
      },
      onError: error => {
        console.log(error.data.message)
      },
    })
  }

  const onSubmitNickname = () => {
    const error = validation(nickname)
    if (error) return alert(error)
    if (nickname === user?.nickname) return alert('새로운 별명을 입력해주세요.')

    updateNickname(nickname, {
      onSuccess: () => {
        setUser({ ...user, nickname })
        alert('별명을 수정했어요.')
        setIsNicknameChanged(false)
      },
      onError: error => {
        console.log(error.data.message)
      },
    })
  }

  if (!userData) return <Spinner />

  const validation = nickname =>
    nickname != user.nickname && checkNickname.data?.nicknameExists
      ? '이미 존재하는 별명이에요.'
      : VALIDATIONS.required(nickname) ||
        VALIDATIONS.nickname(nickname) ||
        VALIDATIONS.maxLength(nickname, 10)

  return (
    <>
      <div className='flex flex-col bg-white p-4 pt-12 gap-8'>
        <EditProfileImage
          src={userData?.imageUrl}
          setBlob={setBlob}
          size={120}
          setIsChanged={setIsPhotoChanged}
        />
        <DefaultButton
          type={isPhotoChanged ? '' : 'disabled'}
          onClick={onSubmitPhoto}
        >
          사진 수정
        </DefaultButton>

        <hr className='py-2 border-0' />

        <TextInput
          label='별명'
          required
          value={nickname}
          setValue={setNickname}
          validate={validation}
          limit={v => v.length > 10 && '10자 이내로 입력해주세요.'}
        />
        <DefaultButton
          onClick={onSubmitNickname}
          type={isNicknameChanged ? '' : 'disabled'}
        >
          별명 수정
        </DefaultButton>
      </div>
    </>
  )
}

export default EditProfilePage
