import character from '@/assets/images/characters/inBoard.png'
import ProfileImage from '@/features/user/components/ProfileImage'

function NoChatroomItem() {
  return (
    <div className='flex items-center grid grid-cols-6 p-4 gap-5 border-b border-gray-200'>
      <ProfileImage src={character} size={52} />
      <div className='col-span-4 flex flex-col shrink w-full justify-between'>
        <div className='flex justify-between items-center'>
          <div className='font-bold'>땅땅이</div>
        </div>
        <div className='flex shrink justify-between items-center gap-2'>
          <span className='tracking-tight truncate'>아직 채팅방이 없네요.</span>
        </div>
      </div>
    </div>
  )
}

export default NoChatroomItem
