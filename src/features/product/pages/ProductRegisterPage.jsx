import { useState } from 'react'
import usePageName from '@/hooks/usePageName'
import TextInput from '@/components/form/TextInput'
import TextArea from '@/components/form/TextArea'
import DefaultButton from '@/components/buttons/DefaultButton'
import DatePicker from '@/components/form/DatePicker'
import { validate } from '@/utils/validate'
import NumberInput from '@/components/form/NumberInput'
import ImagePicker from '../components/ImagePicker'
import CategoryPicker from '@/components/modals/CategoryPicker'
import DealTypePicker from '@/components/modals/DealtypePicker'
import DealLocationPicker from '@/components/modals/DealLocationPicker'
import Modal from '../../../components/modals/Modal'
import MaterialIcon from '../../../components/icons/MaterialIcon'
import { useNavigate } from 'react-router-dom'

function ProductRegisterPage() {
  usePageName('상품등록')

  const [images, setImages] = useState([])
  const [title, setTitle] = useState('')
  const [productName, setProductName] = useState('')
  const [category, setCategory] = useState(null)
  const [minBidPrice, setMinBidPrice] = useState(0)
  const [instantHammerPrice, setInstantHammerNowPrice] = useState(0)
  const [openDate, setOpenDate] = useState('')
  const [closeDate, setCloseDate] = useState('')
  const [description, setDescription] = useState('')
  const [tradeType, setTradeType] = useState('')
  const [tradePlace, setTradePlace] = useState(null)

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  const [registeredProductId, setRegisteredProductId] = useState(null)

  const route = useNavigate()
  const onConfirm = () => {
    setIsConfirmModalOpen(false)
    // API 호출
    setRegisteredProductId(123)
    setIsSuccessModalOpen(true)
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
    category: {
      label: '카테고리',
      state: category,
    },
    minBidPrice: {
      label: '최소입찰가',
      state: minBidPrice,
    },
    instantHammerPrice: {
      label: '즉시낙찰가',
      state: instantHammerPrice,
    },
    openDate: {
      label: '개찰 시각',
      state: openDate,
    },
    closeDate: {
      label: '마감 시각',
      state: closeDate,
    },
    description: {
      label: '자세한 설명',
      state: description,
    },
    tradeType: {
      label: '거래 유형',
      state: tradeType,
    },
    tradePlace: {
      label: '거래희망장소',
      state: tradePlace,
    },
  }

  const validation = {
    title: title => validate.maxLength(title, 20) || validate.required(title),
    productName: productName =>
      validate.maxLength(productName, 30) || validate.required(productName),
    category: category => validate.required(category),
    minBidPrice: minBidPrice =>
      validate.minPrice(minBidPrice, 0) ||
      validate.maxPrice(minBidPrice, 10000000) ||
      validate.required(minBidPrice),
    instantHammerPrice: instantHammerPrice =>
      validate.minPrice(instantHammerPrice, minBidPrice) ||
      validate.maxPrice(minBidPrice, 10000000),
    openDate: openDate => validate.required(openDate),
    closeDate: closeDate =>
      validate.required(closeDate) || validate.minDate(closeDate, openDate),
    description: description =>
      validate.maxLength(description, 200) || validate.required(description),
    tradeType: tradeType => validate.required(tradeType),
    tradePlace: tradePlace => validate.required(tradePlace),
  }

  const handleSubmit = () => {
    const valid = Object.keys(validation).every(
      key => !validation[key](states[key].state),
    )
    // if (!valid) {
    //   console.log('유효성 검사 실패')
    //   return
    // }
    setIsConfirmModalOpen(true)
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
        value={category}
        setValue={setCategory}
        validate={validation.category}
      />
      <NumberInput
        label='최소입찰가'
        required
        value={minBidPrice}
        setValue={setMinBidPrice}
        validate={validation.minBidPrice}
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
        value={openDate}
        setValue={setOpenDate}
        validate={validation.openDate}
      />
      <DatePicker
        label='마감 시각'
        required
        value={closeDate}
        setValue={setCloseDate}
        validate={validation.closeDate}
      />
      <TextArea
        label='자세한 설명'
        required
        value={description}
        setValue={setDescription}
        validate={validation.description}
      />
      <DealTypePicker
        label='거래 유형'
        required
        value={tradeType}
        setValue={setTradeType}
        validate={validation.tradeType}
      />
      {tradeType.includes('직거래') && (
        <DealLocationPicker
          label='거래희망장소'
          required
          value={tradePlace}
          setValue={setTradePlace}
          validate={validation.tradePlace}
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
                    <div key={key} className='w-full flex justify-between'>
                      <span>{states[key].label}</span>
                      <span>{states[key].state}</span>
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
              {new Date(openDate).toLocaleString('ko-KR', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </p>
          </div>
          <DefaultButton
            onClick={() => route(`/popup/product/${registeredProductId}`)}
          >
            확인
          </DefaultButton>
        </Modal>
      )}
    </div>
  )
}

export default ProductRegisterPage
