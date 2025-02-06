import ROUTES from '@/data/ROUTES'

export default [
  [
    { to: ROUTES.PAYMENT_HISTORY, icon: 'credit_card', title: '결제내역' },
    { to: ROUTES.PURCHASE_HISTORY, icon: 'sticky_note_2', title: '구매내역' },
    { to: ROUTES.SALE_HISTORY, icon: 'sticky_note_2', title: '판매내역' },
    { to: ROUTES.FAVORITES, icon: 'favorite', title: '찜 목록' },
    { to: ROUTES.SUBSCRIPTIONS, icon: 'sort', title: '모아보기' },
    { to: ROUTES.REVIEW_HISTORY, icon: 'for_you', title: '리뷰내역' },
    { to: ROUTES.MY_LOCATIONS, icon: 'location_on', title: '내 장소' },
  ],
  [
    { to: ROUTES.NOTICES, icon: 'event_note', title: '공지사항' },
    { to: ROUTES.CUSTOMER_SERVICE, icon: 'support_agent', title: '고객센터' },
    { to: ROUTES.APP_SETTING, icon: 'settings', title: '앱 설정' },
  ],
]
