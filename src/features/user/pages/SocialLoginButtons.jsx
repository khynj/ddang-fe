import { useSocialLogin } from '@/apis/auth'
import googleIcon from '@/assets/images/oauth/google.png'
import kakaoIcon from '@/assets/images/oauth/kakao.png'
import naverIcon from '@/assets/images/oauth/naver.png'

function SocialLoginButtons() {
  const { mutate } = useSocialLogin()
  const loginAs = provider => {
    mutate(provider, {
      onSuccess: data => {
        console.log(data)
      },
      onError: error => {
        console.log(error)
      },
    })
  }
  return (
    <div className='flex flex-col gap-4'>
      <button
        onClick={() => loginAs('google')}
        className='flex flex-row justify-between rounded-lg p-3 border-1 border-[#747775]'
      >
        <img
          width='24'
          height='24'
          src={googleIcon}
          alt='Google'
          className='object-contain'
        />
        Google 계정으로 로그인
        <div className='p-2'></div>
      </button>
      <button
        onClick={() => loginAs('kakao')}
        className='flex flex-row justify-between rounded-lg bg-[#FEE500] p-3'
      >
        <img
          width='24'
          height='24'
          src={kakaoIcon}
          alt='Kakao'
          className='object-contain'
        />
        카카오 로그인
        <div className='p-2'></div>
      </button>
      <button
        onClick={() => loginAs('naver')}
        className='flex flex-row justify-between rounded-lg bg-[#03C75A] text-white p-3'
      >
        <img
          width='24'
          height='24'
          src={naverIcon}
          alt='Naver'
          className='object-contain'
        />
        네이버 로그인
        <div className='p-2 '></div>
      </button>
    </div>
  )
}

export default SocialLoginButtons
