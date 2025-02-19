import { Link, useNavigate } from 'react-router'
import DefaultButton from '@/components/buttons/DefaultButton'
import TextInput from '@/components/form/TextInput'
import usePageName from '@/hooks/usePageName'
import StickyContainer from '@/components/StickyContainer'
import ROUTES from '@/data/ROUTES'
import { useLogin } from '@/apis/auth'
import { useState } from 'react'
import { VALIDATIONS } from '@/utils/VALIDATIONS'
import SocialLoginButtons from '../components/SocialLoginButtons'

function LoginPage() {
  usePageName('로그인')
  const route = useNavigate()
  const { mutate: requestLogin, error } = useLogin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = e => {
    e.preventDefault()
    const loginData = {
      email,
      password,
    }
    requestLogin(loginData, {
      onSuccess: () => {
        route(ROUTES.LANDING)
      },
    })
  }

  return (
    <div className='mt-2'>
      <form onSubmit={handleLogin} className=' p-4'>
        <TextInput
          label='이메일'
          required
          type='email'
          value={email}
          setValue={setEmail}
          validate={e => VALIDATIONS.required(e) || VALIDATIONS.email(e)}
          limit={v => VALIDATIONS.maxLength(v, 40)}
        />
        <TextInput
          label='비밀번호'
          required
          type='password'
          value={password}
          setValue={setPassword}
          validate={VALIDATIONS.required}
          limit={v => VALIDATIONS.maxLength(v, 16)}
        />
        {error && (
          <div className='text-red-500 text-sm'>
            아이디 혹은 비밀번호가 다릅니다.
          </div>
        )}
        <div className='mt-8 mb-3'>
          <DefaultButton submit onClick={handleLogin}>
            로그인
          </DefaultButton>
        </div>
        <div className='px-1 p-2 flex flex-row justify-between text-gray-500 text-sm'>
          {/* <div className='flex flex-row gap-4'>
            <Link to='/popup/signup'>비밀번호 찾기</Link>
          </div> */}
          <Link to={ROUTES.SIGNUP}>회원가입</Link>
        </div>
      </form>
      <StickyContainer plain>
        <SocialLoginButtons />
      </StickyContainer>
    </div>
  )
}

export default LoginPage
