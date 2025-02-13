import { useBidAuction, useToggleFavorite } from '@/apis/auction'
import DefaultButton from '@/components/buttons/DefaultButton'
import IconButton from '@/components/buttons/IconButton'
import FavoriteButton from '@/components/icons/FavoriteButton'
import StickyContainer from '@/components/StickyContainer'
import ROUTES from '@/data/ROUTES'
import LoadingPage from '@/pages/LoadingPage'
import { dday } from '@/utils/Dday'
import { formatPrice } from '@/utils/formatPrice'
import { useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useNavigate } from 'react-router'

function ProductDetailDrawer({ product }) {
  const route = useNavigate()
  const queryClient = useQueryClient()
  const { mutate: toggleLike } = useToggleFavorite()
  const { mutate: bid } = useBidAuction()
  const minimumBidPrice = product
    ? product.auction.currentBidPrice || product.auction.minimumBid
    : 0
  const [bidPrice, setBidPrice] = useState(minimumBidPrice)

  if (!product) return <LoadingPage />

  const { auction, seller } = product

  const handleBidPrice = e => {
    setBidPrice(e.target.value)
  }

  const onLike = () => {
    toggleLike(auction.auctionId, {
      onSuccess: data => {
        console.log(data)
        queryClient.invalidateQueries('auctionDetails')
      },
    })
  }

  const onBid = () => {
    if (bidPrice < minimumBidPrice)
      return alert('최소 입찰가보다 높게 입찰해주세요.')
    bid({
      auctionId: auction.auctionId,
      bidPrice: bidPrice,
      onSuccess: data => {
        console.log(data)
        queryClient.invalidateQueries('auctionDetails')
      },
    })
  }

  return (
    <StickyContainer rounded>
      <div className='flex justify-between items-center mb-2'>
        <span className='text-sm'>마감까지 {dday(auction.endTime)}</span>
        <div className='flex gap-4'>
          <IconButton
            icon={{
              name: 'forum',
              size: 28,
              className: 'text-gray-500',
              filled: true,
            }}
            onClick={() =>
              route(ROUTES.CHATROOM.replace(':id', auction.chattingRoomId))
            }
          />
          <FavoriteButton
            liked={auction.isFavorite}
            size={28}
            onClick={onLike}
          />
        </div>
      </div>
      <div className='flex'>
        <p className='font-bold'>
          현재 {formatPrice(auction.currentBidPrice || auction.minimumBid)}원
        </p>
      </div>
      <input
        type='number'
        value={bidPrice}
        onChange={handleBidPrice}
        className='flex grow border-b-2 w-full font-bold text-end text-2xl'
      />
      <div className='flex gap-2 leading-none text-sm py-4'>
        <button className='bg-ddblue-400 text-white p-2 font-bold rounded-md'>
          +1,000
        </button>
        <button className='bg-ddblue-500 text-white p-2 font-bold rounded-md'>
          +10,000
        </button>
      </div>
      <div className='flex gap-4 mt-2'>
        <DefaultButton type={'red'}>
          <span>즉시낙찰</span>
        </DefaultButton>
        <DefaultButton onClick={onBid}>
          <span>응찰</span>
        </DefaultButton>
      </div>
    </StickyContainer>
  )
}

ProductDetailDrawer.propTypes = {
  product: PropTypes.object.isRequired,
}

export default ProductDetailDrawer
