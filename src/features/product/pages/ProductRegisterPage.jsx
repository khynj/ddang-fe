import { useState } from 'react'
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
import { dateToKst, kstToDate } from '@/utils/date'
import TitleInput from '@/components/form/TitleInput'
import { useCategoryRecommendation } from '@/apis/ai'

function ProductRegisterPage() {
  const { state } = useLocation()

  const auction = state?.product ? state.product.auction : null
  const isEdit = !!auction
  const actionName = isEdit ? '수정' : '등록'
  usePageName(`경매${actionName}`)

  const [images, setImages] = useState([])
  const [title, setTitle] = useState(auction?.title || '')
  const [productName, setProductName] = useState(auction?.productName || '')
  const [categoryId, setCategory] = useState(
    auction?.category.categoryId || null,
  )
  const [minimumBid, setMinimumBid] = useState(auction?.minimumBid || 0)
  const [instantHammerPrice, setInstantHammerNowPrice] = useState(
    auction?.instantHammerPrice || 0,
  )
  const [startTime, setStartTime] = useState(
    auction ? kstToDate(auction.startTime) : '',
  )
  const [endTime, setEndTime] = useState(
    auction ? kstToDate(auction.endTime) : '',
  )
  const [content, setContent] = useState(auction?.content || '')
  const [tradeType, setTradeType] = useState(
    auction?.tradeType || { value: '', isDirect: false },
  )
  const [location, setLocation] = useState(auction?.location || null)

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [registeredProductId, setRegisteredProductId] = useState(null)

  const { mutate: registerProduct } = useCreateAuction()
  const { mutate: updateProduct } = useUpdateAuction()

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
      startTime: dateToKst(startTime),
      endTime: dateToKst(endTime),
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
        console.log('auctionId: ', data.auctionId)
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
    },
    productName: {
      label: '상품명',
      state: productName,
    },
    categoryId: {
      label: '카테고리',
      state: categoryId,
    },
    minimumBid: {
      label: '최소입찰가',
      state: minimumBid,
    },
    instantHammerPrice: {
      label: '즉시낙찰가',
      state: instantHammerPrice,
    },
    startTime: {
      label: '개찰 시각',
      state: startTime,
    },
    endTime: {
      label: '마감 시각',
      state: endTime,
    },
    content: {
      label: '자세한 설명',
      state: content,
    },
    tradeType: {
      label: '거래 유형',
      state: tradeType,
    },
    location: {
      label: '거래희망장소',
      state: location,
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
      VALIDATIONS.minPrice(instantHammerPrice, minimumBid) ||
      VALIDATIONS.maxPrice(minimumBid, 10000000),
    startTime: startTime =>
      VALIDATIONS.required(startTime) ||
      VALIDATIONS.minDate(startTime, new Date()),
    endTime: endTime =>
      VALIDATIONS.required(endTime) || VALIDATIONS.minDate(endTime, startTime),
    content: content =>
      VALIDATIONS.maxLength(content, 200) || VALIDATIONS.required(content),
    tradeType: tradeType => VALIDATIONS.required(tradeType),
    location: location => tradeType.isDirect && VALIDATIONS.required(location),
  }

  const handleSubmit = () => {
    const valid = Object.keys(validation).every(key => {
      if (images.length === 0) {
        alert('이미지를 등록해주세요.')
        return false
      }
      const result = validation[key](states[key].state)
      if (result) {
        alert(key + ' ' + result)
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
  const [categoryRecommendation, setCategoryRecommendation] = useState([])

  const { mutateAsync: recommendCategory } = useCategoryRecommendation()

  return (
    <div className='flex flex-col p-4'>
      <ImagePicker images={images} setImages={setImages} />
      <hr className='my-3 mb-2 border-gray-200' />
      <TitleInput
        label='제목'
        required
        value={title}
        validate={validation.title}
        onChange={e => {
          console.log(e.target.value)
          recommendCategory(
            { title: e.target.value },
            {
              onSuccess: data => {
                setCategoryRecommendation(data)
              },
            },
          )
          setTitle(e.target.value)
        }}
      />
      <TextInput
        label='상품명'
        required
        value={productName}
        setValue={setProductName}
        validate={validation.productName}
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
      />
      <NumberInput
        label='최소입찰가'
        required
        value={minimumBid}
        setValue={setMinimumBid}
        validate={validation.minimumBid}
      />
      <NumberInput
        label='즉시낙찰가'
        value={instantHammerPrice}
        setValue={setInstantHammerNowPrice}
        validate={validation.instantHammerPrice}
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
        value={tradeType.value}
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
                        {typeof states[key].state === 'object'
                          ? states[key].state.value
                          : states[key].state}
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
        <Modal close={() => setIsSuccessModalOpen(false)}>
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
