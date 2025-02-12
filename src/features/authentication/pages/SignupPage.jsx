import { useNavigate } from 'react-router'
import DefaultButton from '@/components/buttons/DefaultButton'
import TextInput from '@/components/form/TextInput'
import usePageName from '@/hooks/usePageName'
import StickyContainer from '@/components/StickyContainer'
import { useState } from 'react'
import ROUTES from '@/data/ROUTES'
import { useCheckDuplicate, useSignUp } from '@/apis/member'
import { VALIDATIONS } from '@/utils/VALIDATIONS'
import { useLogin } from '@/apis/auth'
import { useAuth } from '@/contexts/AuthContext'

function SignupPage() {
  usePageName('회원가입')
  const route = useNavigate()

  const { login } = useAuth()

  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const { error, mutate: signUp } = useSignUp()
  const { mutate: requestLogin } = useLogin()
  const checkNickname = useCheckDuplicate({ email: '', nickname })
  const checkEmail = useCheckDuplicate({ nickname: '', email })

  const validation = {
    nickname: nickname =>
      VALIDATIONS.required(nickname) ||
      (checkNickname.data?.nicknameExists ? '이미 존재하는 닉네임이에요.' : ''),
    email: email =>
      VALIDATIONS.required(email) ||
      VALIDATIONS.email(email) ||
      (checkEmail.data?.emailExists ? '이미 존재하는 이메일이에요.' : ''),
    password: password => VALIDATIONS.required(password),
    passwordConfirm: passwordConfirm =>
      VALIDATIONS.required(passwordConfirm) ||
      (passwordConfirm !== password ? '비밀번호가 일치하지 않습니다.' : ''),
  }

  const onSubmit = e => {
    e.preventDefault()
    signUp(
      { name, nickname, email, password },
      {
        onSuccess: ({ memberId }) => {
          login({ memberId, name, nickname, email })
          requestLogin({ email, password })
          route(ROUTES.HOME, { state: { welcome: true } })
        },
      },
    )
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='flex flex-col gap-6 p-4'>
        <div>
          <TextInput
            label='별명'
            required
            value={nickname}
            setValue={setNickname}
            validate={validation.nickname}
          />
          <TextInput
            label='이메일'
            required
            type='email'
            value={email}
            setValue={setEmail}
            validate={validation.email}
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
            validate={validation.password}
          />
          <TextInput
            label='비밀번호 확인'
            required
            type='password'
            value={passwordConfirm}
            setValue={setPasswordConfirm}
            validate={validation.passwordConfirm}
          />
          {error && (
            <div className='text-sm text-red-400'>
              {error.response?.data?.message || '회원가입에 실패했어요.'}
            </div>
          )}
        </div>
      </div>
      <StickyContainer>
        <DefaultButton submit onClick={onSubmit}>
          회원가입
        </DefaultButton>
      </StickyContainer>
    </form>
  )
}

export default SignupPage
