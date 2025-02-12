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
import { useNavigate } from 'react-router'
import { useCreateAuction } from '@/apis/auction'
import ROUTES from '@/data/ROUTES'
import { formatDateToKst } from '@/utils/formantDateToKST'

function ProductRegisterPage() {
  usePageName('상품등록')

  const [images, setImages] = useState([])
  const [title, setTitle] = useState('')
  const [productName, setProductName] = useState('')
  const [categoryId, setCategory] = useState(null)
  const [minimumBid, setMinimumBid] = useState(0)
  const [instantHammerPrice, setInstantHammerNowPrice] = useState(0)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [content, setContent] = useState('')
  const [tradeType, setTradeType] = useState({ value: '', isDirect: false })
  const [location, setLocation] = useState(null)

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [registeredProductId, setRegisteredProductId] = useState(null)

  const { mutate: registerProduct } = useCreateAuction()

  const route = useNavigate()
  const onConfirm = () => {
    setIsConfirmModalOpen(false)
    // API 호출
    const form = new FormData()
    const product = {
      title,
      productName,
      categoryId,
      minimumBid,
      instantHammerPrice,
      startTime: formatDateToKst(new Date(startTime)),
      endTime: formatDateToKst(new Date(endTime)),
      content,
      tradeType,
      location,
    }

    console.log(product)

    form.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json' }),
    )

    images.forEach(image => {
      console.log(image)
      form.append(`images`, image)
    })
    registerProduct(form, {
      onSuccess: data => {
        console.log('auctionId: ', data.auctionId)
        setRegisteredProductId(data.auctionId)
        setIsSuccessModalOpen(true)
      },
      onError: error => {
        console.error(error)
        alert('상품 등록에 실패했습니다.')
      },
    })
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
    startTime: startTime => VALIDATIONS.required(startTime),
    endTime: endTime =>
      VALIDATIONS.required(endTime) || VALIDATIONS.minDate(endTime, startTime),
    content: content =>
      VALIDATIONS.maxLength(content, 200) || VALIDATIONS.required(content),
    tradeType: tradeType => VALIDATIONS.required(tradeType),
    location: location => tradeType.isDirect && VALIDATIONS.required(location),
  }

  const handleSubmit = () => {
    const valid = Object.keys(validation).every(key => {
      const result = validation[key](states[key].state)
      if (result) {
        alert(key + result)
        return false
      }
      return true
    })
    if (!valid) {
      alert('입력 값을 확인하세요.')
      return
    }
    setIsConfirmModalOpen(true)
  }

  const handleCommit = () => {
    route(ROUTES.PRODUCT_DETAIL.replace(':id', registeredProductId))
  }

  return (
    <div className='flex flex-col p-4'>
      <ImagePicker images={images} setImages={setImages} />
      <hr className='my-3 mb-2 border-gray-200' />
      <TextInput
        label='제목'
        required
        value={title}
        setValue={setTitle}
        validate={validation.title}
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
      <DefaultButton onClick={handleSubmit}>등록</DefaultButton>
      {isConfirmModalOpen && (
        <Modal close={() => setIsConfirmModalOpen(false)}>
          <div className='flex flex-col gap-4 w-full text-center'>
            <div className='flex flex-col gap-1'>
              <p className='font-bold text-sm'>{productName}</p>
              <p className='font-bold text-ddblue-400'>경매 등록</p>
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
            <p className='font-bold'>경매 등록 완료</p>
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
