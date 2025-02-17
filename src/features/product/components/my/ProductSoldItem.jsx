import PropTypes from 'prop-types'
import ProductImage from '../ProductImage'
import ROUTES from '@/data/ROUTES'
import { Link, useNavigate } from 'react-router'
import { relativeTime } from '@/utils/date'
import { useState } from 'react'
import Modal from '@/components/modals/Modal'
import DefaultButton from '@/components/buttons/DefaultButton'
import MaterialIcon from '@/components/icons/MaterialIcon'
import { formatPrice } from '@/utils/price'
import { useConfirmPurchase } from '@/apis/auction'
import { useQueryClient } from '@tanstack/react-query'

function ProductSoldItem({ product, isSeller }) {
  const queryClient = useQueryClient()
  const price = formatPrice(product.currentBidPrice)
  const endTime = relativeTime(product.endTime)

  const route = useNavigate()

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isReviewConfirmModalOpen, setIsReviewConfirmModalOpen] =
    useState(false)

  const { mutate: confirmPurchase } = useConfirmPurchase()

  const openConfirmModal = () => setIsConfirmModalOpen(true)
  const closeConfirmModal = () => setIsConfirmModalOpen(false)
  const onConfirmPurchase = () => {
    confirmPurchase(product.auctionId, {
      onSuccess: () => {
        setIsConfirmModalOpen(false)
        setIsReviewConfirmModalOpen(true)
        queryClient.invalidateQueries(['searchMyBids', 'searchAuctions'])
      },
    })
  }
  const onConfirmReview = () => {
    closeReviewConfirmModal()
    route(ROUTES.REVIEW_REGISTER.replace(':id', product.auctionId), {
      state: { revieweeRole: isSeller ? 'buyer' : 'seller' },
    })
  }
  const closeReviewConfirmModal = () => setIsReviewConfirmModalOpen(false)

  return (
    <>
      <Link
        className={`grid grid-cols-7 grid-rows-4 p-4 gap-3 gap-y-0 border-b border-gray-200`}
        to={ROUTES.PRODUCT_DETAIL.replace(':id', product.auctionId)}
      >
        <div className='col-span-2 row-span-4'>
          <ProductImage product={product} heartSize={26} heart />
        </div>
        <div className='col-span-5 row-span-2 flex flex-col w-full py-0.5'>
          <div className='flex justify-between'>
            <p className='font-bold text-gray-900 tracking-tight truncate'>
              {product.title}
            </p>
            <p className='text-sm text-gray-700 shrink-0'>{endTime}</p>
          </div>
          <p className='font-bold text-gray-950'>{price}원 낙찰</p>
        </div>
        <div className='flex justify-end items-end row-span-2 col-span-5'>
          {product.myConfirm ? (
            <p className='p-2 px-4 whitespace-nowrap text-sm text-gray-500'>
              {product.opponentCofirm
                ? '상대방이 확정 전이에요.'
                : '거래가 확정되었어요.'}
            </p>
          ) : (
            <button
              className='p-2 px-4 rounded-xl bg-ddred-400'
              onClick={e => {
                e.preventDefault()
                openConfirmModal()
              }}
            >
              <p className='text-white text-sm text-center'>
                {isSeller ? '판매확정' : '구매확정'}
              </p>
            </button>
          )}
        </div>
      </Link>
      {isConfirmModalOpen && (
        <Modal close={closeConfirmModal}>
          <div className='flex flex-col w-full gap-2 text-center'>
            <div>
              <p className='font-bold text-gray-900'>{product.productName}</p>
              <p className='text-lg font-bold text-ddred-500'>
                {isSeller ? '판매확정' : '구매확정'}
              </p>
            </div>
            <div className='flex flex-col p-2 my-1'>
              <div className='flex justify-between'>
                <p>낙찰가</p>
                <p>{price}원</p>
              </div>
              <div className='flex justify-between'>
                <p>낙찰일시</p>
                <p>{product.endTime}</p>
              </div>
            </div>
            <div className='flex grow gap-2'>
              <DefaultButton type='gray' onClick={closeConfirmModal}>
                취소
              </DefaultButton>
              <DefaultButton type='red' onClick={onConfirmPurchase}>
                {isSeller ? '판매확정' : '구매확정'}
              </DefaultButton>
            </div>
          </div>
        </Modal>
      )}
      {isReviewConfirmModalOpen && (
        <Modal close={closeReviewConfirmModal}>
          <div className='flex flex-col w-full gap-2 text-center'>
            <div>
              <MaterialIcon
                name='check_circle'
                size={32}
                filled
                className='text-ddblue-400'
              />
              <p className='text-lg font-bold text-ddblue-400'>
                {isSeller ? '판매확정' : '구매확정'} 완료
              </p>
            </div>
            <div className='p-2'>
              <p>
                건강한 플랫폼 유지를 위해 <br /> 리뷰를 작성해주세요.
              </p>
            </div>
            <div className='flex grow gap-2'>
              <DefaultButton type='gray' onClick={closeReviewConfirmModal}>
                닫기
              </DefaultButton>
              <DefaultButton onClick={onConfirmReview}>확인</DefaultButton>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

ProductSoldItem.propTypes = {
  product: PropTypes.object,
  isSeller: PropTypes.bool,
}

export default ProductSoldItem
