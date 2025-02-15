import {
  useBidAuction,
  useDeleteAuction,
  usePurchaseAuction,
  useToggleFavorite,
} from '@/apis/auction'
import DefaultButton from '@/components/buttons/DefaultButton'
import IconButton from '@/components/buttons/IconButton'
import FavoriteButton from '@/components/icons/FavoriteButton'
import StickyContainer from '@/components/StickyContainer'
import ROUTES from '@/data/ROUTES'
import useEndTimeDDay from '@/hooks/useEndTimeDDay'
import LoadingPage from '@/pages/LoadingPage'
import { dateToKst } from '@/utils/date'
import { formatPrice, getMinimumBidUnit } from '@/utils/price'
import { useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

/* TODO
  경매 시작 전 화면 (판매자, 구매자)
*/
function ProductDetailDrawer({ product, isMine }) {
  const route = useNavigate()
  const queryClient = useQueryClient()
  const { mutate: toggleLike } = useToggleFavorite()
  const { mutate: bid } = useBidAuction()
  const { mutate: purchase } = usePurchaseAuction()
  const { mutate: requestDelete } = useDeleteAuction()

  const [minimumBidPrice, setMinimumBidPrice] = useState(0)
  const [minimumBidUnit, setMinimumBidUnit] = useState(0)
  const [bidPrice, setBidPrice] = useState(minimumBidPrice)

  const endTimeDDay = useEndTimeDDay(dateToKst(product.auction.endTime))
  if (!endTimeDDay) {
    queryClient.invalidateQueries('searchAuctions')
  }

  useEffect(() => {
    if (!product) return
    const minPrice =
      product.auction.currentBidPrice || product.auction.minimumBid
    setMinimumBidPrice(minPrice + getMinimumBidUnit(minPrice))
    setMinimumBidUnit(getMinimumBidUnit(minPrice))
  }, [product])

  if (!product) return <LoadingPage />

  const { auction, seller } = product

  const handleBidPrice = e => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setBidPrice(parseInt(value) || 0)
  }

  const addPrice = price => {
    setBidPrice(bidPrice + price)
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
    if (bidPrice > auction.instantHammerPrice) {
      setBidPrice(auction.instantHammerPrice)
      return alert('즉시구매가보다 높게 입찰할 수 없습니다.')
    }
    if (bidPrice < minimumBidPrice)
      return alert('최소 입찰가보다 높게 입찰해주세요.')
    if (bidPrice == auction.instantHammerPrice) return onPurchase()
    if (!confirm(formatPrice(bidPrice) + '원에 입찰하시겠습니까?')) return
    bid(
      {
        auctionId: auction.auctionId,
        bidPrice: bidPrice,
      },
      {
        onSuccess: () => {
          alert('입찰에 성공했습니다.')
          queryClient.invalidateQueries('auctionDetails')
        },
        onError: err => {
          alert('err')
        },
      },
    )
  }

  const onPurchase = () => {
    if (
      !confirm(
        formatPrice(auction.instantHammerPrice) + '원에 즉시구매 하시겠습니까?',
      )
    )
      return
    purchase(auction.auctionId, {
      onSuccess: () => {
        alert('즉시구매에 성공했습니다.')
        queryClient.invalidateQueries('auctionDetails')
      },
      onError: error => {
        alert(error)
      },
    })
  }

  const onEdit = () => {
    route(ROUTES.PRODUCT_REGISTER, { state: { product } })
  }

  const onDelete = () => {
    if (!confirm('정말 삭제하시겠습니까?')) return
    requestDelete(auction.auctionId, {
      onSuccess: data => {
        alert('삭제되었습니다.')
        route(ROUTES.HOME)
      },
      onError: error => {
        alert(error)
      },
    })
  }

  return (
    <StickyContainer rounded>
      <div className='flex justify-between items-center mb-2'>
        <span className='text-sm'>
          {endTimeDDay ? `마감까지 ${endTimeDDay} 남음` : `경매 종료됨`}
        </span>
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
        <p className='font-bold'>최소입찰가 {formatPrice(minimumBidPrice)}원</p>
      </div>
      {isMine ? (
        <div className='flex gap-4 mt-2'>
          <DefaultButton type='red' onClick={onDelete}>
            <span>삭제</span>
          </DefaultButton>
          <DefaultButton type={'gray'} onClick={onEdit}>
            <span>수정</span>
          </DefaultButton>
        </div>
      ) : (
        <>
          <input
            type='text'
            value={formatPrice(bidPrice)}
            onChange={handleBidPrice}
            className='flex grow border-b-2 w-full font-bold text-end text-2xl'
          />
          <div className='flex gap-2 leading-none text-sm py-4'>
            <button
              onClick={() => addPrice(minimumBidUnit)}
              className='bg-ddblue-400 text-white p-2 font-bold rounded-md'
            >
              +{minimumBidUnit}
            </button>
            <button
              onClick={() => addPrice(minimumBidUnit * 10)}
              className='bg-ddblue-500 text-white p-2 font-bold rounded-md'
            >
              +{minimumBidUnit * 10}
            </button>
          </div>
          <div className='flex gap-4 mt-2'>
            <DefaultButton type={'red'} onClick={onPurchase}>
              <span>즉시낙찰</span>
            </DefaultButton>
            <DefaultButton onClick={onBid}>
              <span>응찰</span>
            </DefaultButton>
          </div>
        </>
      )}
    </StickyContainer>
  )
}

ProductDetailDrawer.propTypes = {
  product: PropTypes.object.isRequired,
  isMine: PropTypes.bool,
}

export default ProductDetailDrawer
