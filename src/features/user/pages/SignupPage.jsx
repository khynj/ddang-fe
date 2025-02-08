import { useNavigate } from 'react-router'
import DefaultButton from '@/components/buttons/DefaultButton'
import TextInput from '@/components/form/TextInput'
import usePageName from '@/hooks/usePageName'
import StickyContainer from '@/components/StickyContainer'
import { useState } from 'react'
import ROUTES from '@/data/ROUTES'
import { useSignUp } from '@/apis/member'

function SignupPage() {
  usePageName('회원가입')
  const route = useNavigate()

  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const useSignup = useSignUp()

  const onSubmit = () => {
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }

    useSignup.mutate(
      { name, nickname, email, password },
      {
        onSuccess: data => {
          console.log(data)
          route(ROUTES.HOME, { state: { welcome: true } })
        },
        onError: error => {
          alert(error.response.data.message)
        },
      },
    )
  }

  return (
    <div>
      <div className='flex flex-col gap-6 p-4'>
        <div>
          <TextInput
            label='별명'
            required
            value={nickname}
            setValue={setNickname}
          />
          <TextInput
            label='이메일'
            required
            type='email'
            value={email}
            setValue={setEmail}
          />
          <TextInput label='이름' required value={name} setValue={setName} />
        </div>
        <div>
          <TextInput
            label='비밀번호'
            required
            type='password'
            value={password}
            setValue={setPassword}
          />
          <TextInput
            label='비밀번호 확인'
            required
            type='password'
            value={passwordConfirm}
            setValue={setPasswordConfirm}
          />
        </div>
      </div>
      <StickyContainer>
        <DefaultButton onClick={onSubmit}>회원가입</DefaultButton>
      </StickyContainer>
    </div>
  )
}

export default SignupPage
