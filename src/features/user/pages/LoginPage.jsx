import { Link, useNavigate } from 'react-router'
import DefaultButton from '@/components/buttons/DefaultButton'
import TextInput from '@/components/form/TextInput'
import usePageName from '@/hooks/usePageName'
import googleIcon from '@/assets/images/oauth/google.png'
import kakaoIcon from '@/assets/images/oauth/kakao.png'
import naverIcon from '@/assets/images/oauth/naver.png'
import StickyContainer from '@/components/StickyContainer'
import ROUTES from '@/data/ROUTES'
import { useLogin } from '@/apis'
import { useState } from 'react'

function LoginPage() {
  usePageName('로그인')
  const route = useNavigate()
  const login = useLogin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = () => {
    const res = login.mutate({
      email,
      password,
    })
    console.log(res)
  }
  return (
    <div className='mt-2'>
      <div className=' p-4'>
        <TextInput
          label='이메일'
          required
          type='email'
          value={email}
          setValue={setEmail}
        />
        <TextInput
          label='비밀번호'
          required
          type='password'
          value={password}
          setValue={setPassword}
        />
        <div className='mt-8 mb-3'>
          <DefaultButton onClick={handleLogin}>로그인</DefaultButton>
        </div>
        <div className='px-1 p-2 flex flex-row justify-between text-gray-500 text-sm'>
          {/* <div className='flex flex-row gap-4'>
            <Link to='/popup/signup'>비밀번호 찾기</Link>
          </div> */}
          <Link to={ROUTES.SIGNUP}>회원가입</Link>
        </div>
      </div>
      <StickyContainer plain>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-row justify-between rounded-lg p-3 border-1 border-[#747775]'>
            <img
              width='24'
              height='24'
              src={googleIcon}
              alt='Google'
              className='object-contain'
            />
            Google 계정으로 로그인
            <div className='p-2'></div>
          </div>
          <div className='flex flex-row justify-between rounded-lg bg-[#FEE500] p-3'>
            <img
              width='24'
              height='24'
              src={kakaoIcon}
              alt='Kakao'
              className='object-contain'
            />
            카카오 로그인
            <div className='p-2'></div>
          </div>
          <div className='flex flex-row justify-between rounded-lg bg-[#03C75A] text-white p-3'>
            <img
              width='24'
              height='24'
              src={naverIcon}
              alt='Naver'
              className='object-contain'
            />
            네이버 로그인
            <div className='p-2 '></div>
          </div>
        </div>
      </StickyContainer>
    </div>
  )
}

export default LoginPage
