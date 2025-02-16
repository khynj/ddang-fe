import PropTypes from 'prop-types'
import ProductItemSmall from './ProductItemSmall'
import { useRelatedAuctions } from '@/apis/auction'
/*

[
  {
    "auctionId": 6,
    "title": "아이패드",
    "productName": "헤라 립스틱 160 써머 라일락",
    "minimumBid": 20000,
    "currentBidPrice": null,
    "instantHammerPrice": 35000,
    "myBidPrice": null,
    "bidderCount": 0,
    "bidCount": 0,
    "startTime": "2025-01-10T06:30:00Z",
    "endTime": "2025-01-20T06:30:00Z",
    "createdAt": "2025-02-16T08:05:41Z",
    "url": "https://ddangddang-bucket.s3.ap-northeast-2.amazonaws.com/auction/product/2ae89b6f-c8cb-4704-884c-4e550478d3e2.png",
    "isFavorite": false,
    "myConfirm": null,
    "opponentConfirm": null,
    "hammeredTime": null
  },
  {
    "auctionId": 2,
    "title": "아이패드 에어",
    "productName": "헤라 립스틱 160 써머 라일락",
    "minimumBid": 20000,
    "currentBidPrice": null,
    "instantHammerPrice": 35000,
    "myBidPrice": null,
    "bidderCount": 0,
    "bidCount": 0,
    "startTime": "2025-01-10T06:30:00Z",
    "endTime": "2025-01-20T06:30:00Z",
    "createdAt": "2025-02-16T08:03:40Z",
    "url": "https://ddangddang-bucket.s3.ap-northeast-2.amazonaws.com/auction/product/2a6b597f-b007-4080-9829-cd0104737add.png",
    "isFavorite": true,
    "myConfirm": null,
    "opponentConfirm": null,
    "hammeredTime": null
  }
]
*/
function RelatedProductList({ product }) {
  const { data: products } = useRelatedAuctions(product.auction.auctionId)
  return (
    <div className='flex flex-col gap-3'>
      <h1 className='font-bold'>{product.auction.productName} 관련 매물</h1>
      <div
        className='flex flex-row gap-2 pb-1
            overflow-x-scroll snap-x snap-madatory'
      >
        {products?.map((product, i) => (
          <ProductItemSmall product={product} key={i} />
        ))}
      </div>
    </div>
  )
}

RelatedProductList.propTypes = {
  product: PropTypes.object,
}

export default RelatedProductList
