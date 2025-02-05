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

  const states = {
    title,
    productName,
    category,
    minBidPrice,
    instantHammerPrice,
    openDate,
    closeDate,
    description,
    tradeType,
    tradePlace,
  }

  const validation = {
    title: title => validate.maxLength(title, 20) || validate.required(title),
    productName: productName =>
      validate.maxLength(productName, 30) || validate.required(productName),
    category: category => validate.required(category),
    minBidPrice: minBidPrice =>
      validate.minValue(minBidPrice, 0) ||
      validate.maxValue(minBidPrice, 10000000) ||
      validate.required(minBidPrice),
    instantHammerPrice: instantHammerPrice =>
      validate.minValue(instantHammerPrice, minBidPrice) ||
      validate.maxValue(minBidPrice, 10000000),
    openDate: openDate => validate.required(openDate),
    closeDate: closeDate =>
      validate.required(closeDate) || validate.minValue(closeDate, openDate),
    description: description =>
      validate.maxLength(description, 200) || validate.required(description),
    tradeType: tradeType => validate.required(tradeType),
    tradePlace: tradePlace => validate.required(tradePlace),
  }

  const handleSubmit = () => {
    const valid = Object.keys(validation).every(
      key => !validation[key](states[key]),
    )
    if (!valid) {
      console.log('유효성 검사 실패')
      return
    } else {
      console.log('유효성 검사 성공')
    }
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
      <DealLocationPicker
        label='거래희망장소'
        required
        value={tradePlace}
        setValue={setTradePlace}
        validate={validation.tradePlace}
      />
      <br />
      <DefaultButton onClick={handleSubmit}>등록</DefaultButton>
    </div>
  )
}

export default ProductRegisterPage
