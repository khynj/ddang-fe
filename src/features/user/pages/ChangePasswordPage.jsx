import DefaultButton from '@/components/buttons/DefaultButton'
import StickyContainer from '@/components/StickyContainer'
import usePageName from '@/hooks/usePageName'
import TextInput from '@/components/form/TextInput'

function ChangePassword() {
  usePageName('비밀번호 변경')
  return (
    <>
      <div className='flex flex-col bg-white p-4 pt-16 gap-8'>
        <TextInput label='새 비밀번호' required />
        <TextInput label='비밀번호 확인' required />
      </div>
      <StickyContainer plain>
        <DefaultButton type='gray'>변경</DefaultButton>
      </StickyContainer>
    </>
  )
}

export default ChangePassword
