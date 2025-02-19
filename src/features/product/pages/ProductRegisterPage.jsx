import { useCallback, useState } from 'react'
import usePageName from '@/hooks/usePageName'
import TextInput from '@/components/form/TextInput'
import TextArea from '@/components/form/TextArea'
import DefaultButton from '@/components/buttons/DefaultButton'
import DatePicker from '@/components/form/DatePicker'
import { VALIDATIONS } from '@/utils/VALIDATIONS'
import NumberInput from '@/components/form/NumberInput'
import ImagePicker from '../components/ImagePicker'
import CategoryPicker from '@/components/modals/CategoryPicker'
import DealTypePicker from '@/components/modals/DealtypePicker'
import DealLocationPicker from '@/components/modals/DealLocationPicker'
import Modal from '@/components/modals/Modal'
import MaterialIcon from '@/components/icons/MaterialIcon'
import { useLocation, useNavigate } from 'react-router'
import { useCreateAuction, useUpdateAuction } from '@/apis/auction'
import ROUTES from '@/data/ROUTES'
import TitleInput from '@/components/form/TitleInput'
import { useCategoryRecommendation } from '@/apis/ai'
import { formatPrice } from '@/utils/price'
import { parseTradeType } from '@/utils/auction'
import Spinner from '@/components/placeholder/Spinner'

function ProductRegisterPage() {
  const { state } = useLocation()

  const auction = state?.product ? state.product.auction : null
  const isEdit = !!auction
  const actionName = isEdit ? '수정' : '등록'
  usePageName(`경매${actionName}`)

  const [images, setImages] = useState([])
  const [imagesLinks, setImageLinks] = useState(auction?.photos || [])
  const [title, setTitle] = useState(auction?.title || '')
  const [productName, setProductName] = useState(auction?.productName || '')
  const [categoryId, setCategory] = useState(
    auction?.category.categoryId || null,
  )
  const [categoryName, setCategoryName] = useState(
    auction?.category.categoryName || '',
  )
  const [minimumBid, setMinimumBid] = useState(auction?.minimumBid || 0)
  const [instantHammerPrice, setInstantHammerNowPrice] = useState(
    auction?.instantHammerPrice || 0,
  )
  const [startTime, setStartTime] = useState(auction ? auction.startTime : '')
  const [endTime, setEndTime] = useState(auction ? auction.endTime : '')
  const [content, setContent] = useState(auction?.content || '')
  const [tradeType, setTradeType] = useState(
    auction
      ? {
          ...auction.tradeType,
          value: parseTradeType(auction.tradeType),
          parcelFeeOption: auction.tradeType.pay.toUpperCase(),
        }
      : { value: '', isDirect: false },
  )
  const [location, setLocation] = useState(auction?.location || null)

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [registeredProductId, setRegisteredProductId] = useState(null)
  const [categoryRecommendation, setCategoryRecommendation] = useState([])

  const { mutate: registerProduct, isPending: pendingRegister } =
    useCreateAuction()
  const { mutate: updateProduct, isPending: pendingUpdate } = useUpdateAuction()
  const { mutateAsync: recommendCategory } = useCategoryRecommendation()

  const route = useNavigate()

  const onConfirm = () => {
    setIsConfirmModalOpen(false)
    const form = new FormData()
    const product = {
      title,
      productName,
      categoryId,
      minimumBid,
      instantHammerPrice,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      content,
      tradeType,
      location,
    }

    form.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json' }),
    )

    images.forEach(image => {
      form.append(`images`, image)
    })

    const options = {
      onSuccess: data => {
        setRegisteredProductId(data.auctionId)
        setIsSuccessModalOpen(true)
      },
      onError: error => {
        console.error(error)
        alert(`상품 ${actionName}에 실패했습니다.`)
      },
    }

    isEdit
      ? updateProduct({ auctionId: auction.auctionId, formData: form }, options)
      : registerProduct(form, options)
  }

  const states = {
    title: {
      label: '제목',
      state: title,
      display: () => title,
    },
    productName: {
      label: '상품명',
      state: productName,
      display: () => productName,
    },
    categoryId: {
      label: '카테고리',
      state: categoryId,
      display: () => categoryName,
    },
    minimumBid: {
      label: '최소입찰가',
      state: minimumBid,
      display: () => formatPrice(minimumBid),
    },
    instantHammerPrice: {
      label: '즉시낙찰가',
      state: instantHammerPrice,
      display: () => formatPrice(instantHammerPrice),
    },
    startTime: {
      label: '개찰 시각',
      state: startTime,
      display: () => new Date(startTime).toLocaleString(),
    },
    endTime: {
      label: '마감 시각',
      state: endTime,
      display: () => new Date(endTime).toLocaleString(),
    },
    content: {
      label: '자세한 설명',
      state: content,
      display: () => content,
    },
    tradeType: {
      label: '거래 유형',
      state: tradeType,
      display: () => tradeType.value,
    },
    location: {
      label: '거래희망장소',
      state: location,
      display: () => location,
    },
  }

  const validation = {
    title: title =>
      VALIDATIONS.maxLength(title, 20) || VALIDATIONS.required(title),
    productName: productName =>
      VALIDATIONS.maxLength(productName, 30) ||
      VALIDATIONS.required(productName),
    categoryId: categoryId => VALIDATIONS.required(categoryId),
    minimumBid: minimumBid =>
      VALIDATIONS.minPrice(minimumBid, 0) ||
      VALIDATIONS.maxPrice(minimumBid, 10000000) ||
      VALIDATIONS.required(minimumBid),
    instantHammerPrice: instantHammerPrice =>
      (instantHammerPrice != 0 &&
        VALIDATIONS.minPrice(instantHammerPrice, minimumBid)) ||
      VALIDATIONS.maxPrice(instantHammerPrice, 10000000),
    startTime: startTime =>
      VALIDATIONS.required(startTime) ||
      VALIDATIONS.minDate(startTime, new Date()),
    endTime: endTime =>
      VALIDATIONS.required(endTime) || VALIDATIONS.minDate(endTime, startTime),
    content: content =>
      VALIDATIONS.maxLength(content, 500) || VALIDATIONS.required(content),
    tradeType: tradeType => VALIDATIONS.required(tradeType.value),
    location: location => tradeType.isDirect && VALIDATIONS.required(location),
  }

  const handleSubmit = () => {
    if (images.length === 0) {
      alert('이미지를 등록해주세요.')
      return false
    }

    const valid = Object.keys(validation).every(key => {
      const result = validation[key](states[key].state)
      if (result) {
        alert(states[key].label + ' ' + result)
        return false
      }
      return true
    })
    if (!valid) return
    setIsConfirmModalOpen(true)
  }

  const handleCommit = () => {
    route(ROUTES.PRODUCT_DETAIL.replace(':id', registeredProductId), {
      replace: true,
    })
  }

  const onTitleChange = e => {
    setTitle(e.target.value)
    recommendCategory(
      { title: e.target.value },
      {
        onSuccess: data => {
          setCategoryRecommendation(data)
        },
      },
    )
  }

  return (
    <div className='flex flex-col p-4'>
      {pendingRegister ? <Spinner /> : pendingUpdate && <Spinner />}
      <ImagePicker
        images={images}
        setImages={setImages}
        imageLinks={imagesLinks}
        setImageLinks={setImageLinks}
      />
      <hr className='my-3 mb-2 border-gray-200' />
      <TitleInput
        label='제목'
        required
        value={title}
        validate={validation.title}
        onChange={onTitleChange}
      />
      <CategoryPicker
        label='카테고리'
        required
        value={categoryId}
        setValue={setCategory}
        validate={validation.categoryId}
        initialCategoryName={auction?.category.categoryName}
        title={title}
        categoryRecommendation={categoryRecommendation}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
      />
      <TextInput
        label='상품명'
        required
        value={productName}
        setValue={setProductName}
        validate={validation.productName}
      />
      <NumberInput
        label='최소입찰가'
        required
        value={minimumBid}
        setValue={setMinimumBid}
        validate={validation.minimumBid}
        limit={v => v > 10000000 && '10000000원 이하로 입력해주세요.'}
      />
      <NumberInput
        label='즉시낙찰가'
        value={instantHammerPrice}
        setValue={setInstantHammerNowPrice}
        validate={validation.instantHammerPrice}
        dependency={minimumBid}
      />
      <DatePicker
        label='개찰 시각'
        required
        value={startTime}
        setValue={setStartTime}
        validate={validation.startTime}
      />
      <DatePicker
        label='마감 시각'
        required
        value={endTime}
        setValue={setEndTime}
        validate={validation.endTime}
        dependency={startTime}
      />
      <TextArea
        label='자세한 설명'
        required
        value={content}
        setValue={setContent}
        validate={validation.content}
      />
      <DealTypePicker
        label='거래 유형'
        required
        value={tradeType}
        setValue={setTradeType}
        validate={validation.tradeType}
      />
      {tradeType.isDirect && (
        <DealLocationPicker
          label='거래희망장소'
          required
          value={location}
          setValue={setLocation}
          validate={validation.location}
        />
      )}
      <br />
      <DefaultButton onClick={handleSubmit}>{actionName}</DefaultButton>
      {isConfirmModalOpen && (
        <Modal close={() => setIsConfirmModalOpen(false)}>
          <div className='flex flex-col gap-4 w-full text-center'>
            <div className='flex flex-col gap-1'>
              <p className='font-bold text-sm'>{productName}</p>
              <p className='font-bold text-ddblue-400'>경매 {actionName}</p>
            </div>
            <div className='flex flex-col text-sm p-2 gap-1'>
              {Object.keys(states).map(
                key =>
                  !!states[key].state && (
                    <div key={key} className='w-full grid grid-cols-7'>
                      <span className='text-start col-span-2 whitespace-nowrap'>
                        {states[key].label}
                      </span>
                      <div></div>
                      <span className='text-end truncate col-span-4'>
                        {states[key].display()}
                      </span>
                    </div>
                  ),
              )}
            </div>
            <div className='flex gap-4'>
              <DefaultButton
                type='gray'
                onClick={() => setIsConfirmModalOpen(false)}
              >
                취소
              </DefaultButton>
              <DefaultButton onClick={onConfirm}>확인</DefaultButton>
            </div>
          </div>
        </Modal>
      )}
      {isSuccessModalOpen && (
        <Modal close={handleCommit}>
          <div className='flex flex-col items-center gap-1 text-ddblue-400'>
            <MaterialIcon name='check_circle' size={32} filled />
            <p className='font-bold'>경매 {actionName} 완료</p>
          </div>
          <div className='flex justify-center gap-2 w-full text-sm mb-2'>
            <p>경매 시작:</p>
            <p>
              {new Date(startTime).toLocaleString('ko-KR', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </p>
          </div>
          <DefaultButton onClick={handleCommit}>확인</DefaultButton>
        </Modal>
      )}
    </div>
  )
}

export default ProductRegisterPage
