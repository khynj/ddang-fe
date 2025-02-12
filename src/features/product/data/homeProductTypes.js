import ROUTES from '@/data/ROUTES'

export default [
  {
    key: 'HOT',
    title: '인기 상품',
    icon: 'local_fire_department',
    to: ROUTES.PRODUCT_LIST,
  },
  {
    key: 'SUBSCRIPTION',
    title: '모아보기',
    icon: 'bookmark',
    to: ROUTES.SUBSCRIPTIONS,
  },
]
