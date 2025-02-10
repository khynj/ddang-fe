import { useSocialLogin } from '@/apis/auth'
import googleIcon from '@/assets/images/oauth/google.png'
import kakaoIcon from '@/assets/images/oauth/kakao.png'
import naverIcon from '@/assets/images/oauth/naver.png'

const socials = [
  {
    name: 'google',
    icon: googleIcon,
    className: 'border-1 border-[#747775]',
    text: 'Google 계정으로 로그인',
  },
  {
    name: 'kakao',
    icon: kakaoIcon,
    className: 'bg-[#FEE500]',
    text: '카카오 로그인',
  },
  {
    name: 'naver',
    icon: naverIcon,
    className: 'bg-[#03C75A] text-white',
    text: '네이버 로그인',
  },
]

function SocialLoginButtons() {
  return (
    <div className='flex flex-col gap-4'>
      {socials.map(({ name, icon, className, text }) => (
        <a
          key={name}
          className={`flex items-center justify-center w-full h-12 rounded-xl ${className}`}
          target='_blank'
          href={`http://127.0.0.1:8080/api/oauth2/authorization/${name}`}
          rel='noopener noreferrer'
        >
          <img src={icon} alt={name} className='w-6 h-6 mr-2' />
          <span>{text}</span>
        </a>
      ))}
    </div>
  )
}

export default SocialLoginButtons
