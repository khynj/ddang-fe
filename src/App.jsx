import {
  initFCM,
  MyPage,
  HomePage,
  ProductDetailPage,
  ProductRegisterPage,
  SearchPage,
  WelcomePage,
  SignupPage,
  LoginPage,
  ProductListPage,
  EditProfilePage,
  ChargePage,
  PaymentHistory,
  NotificationPage,
  ChatroomListPage,
} from './features'
import { Navigate, Route, Routes } from 'react-router-dom'
import ExploreLayout from './layouts/ExploreLayout'
import DefaultLayout from './layouts/DefaultLayout'
import NotFoundPage from './pages/NotFoundPage'
import DropDownLayout from './layouts/DropDownLayout'
import MyAuctionLayout from './layouts/MyAuctionLayout'
import DebateListPage from './features/chat/pages/DebateListPage'
import ChatroomPage from './features/chat/pages/ChatroomPage'

function App() {
  initFCM()

  return (
    <div
      id='app'
      className={`w-full h-dvh mx-auto bg-white max-w-lg overflow-x-hidden overflow-y-scroll`}
    >
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/explore' element={<ExploreLayout />}>
          <Route index element={<HomePage />} />
          <Route path='search' element={<SearchPage />} />
          <Route path='search/products' element={<ProductListPage />} />
        </Route>
        <Route
          path='/my-auction'
          element={
            <DropDownLayout
              routes={[
                { name: '입찰현황', to: 'bidding-list' },
                { name: '판매현황', to: 'selling-list' },
              ]}
            />
          }
        >
          <Route index element={<Navigate to='bidding-list' />} />
          <Route
            path='bidding-list'
            element={<MyAuctionLayout name={'입찰'} />}
          >
            <Route
              index
              element={
                <ProductListPage filter={product => product.myBidPrice} />
              }
            />
            <Route
              path='sold'
              element={
                <ProductListPage
                  filter={product => product.endTime < new Date().toISOString()}
                />
              }
            />
          </Route>
          <Route
            path='selling-list'
            element={<MyAuctionLayout name={'판매'} />}
          >
            <Route
              index
              element={
                <ProductListPage filter={product => product.myBidPrice} />
              }
            />
            <Route
              path='sold'
              element={
                <ProductListPage
                  filter={product => product.endTime < new Date().toISOString()}
                />
              }
            />
          </Route>
        </Route>
        <Route path='/' element={<DefaultLayout />}>
          <Route path='mypage' element={<MyPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>

        <Route
          path='/popup/chatrooms'
          element={
            <DropDownLayout
              back
              routes={[
                { name: '채팅방', to: '' },
                { name: '토론방', to: 'debate' },
              ]}
              feature={{
                icon: { name: 'edit', className: 'text-gray-600' },
                onClick: () => console.log('edit chatroom'),
              }}
            />
          }
        >
          <Route index element={<ChatroomListPage type='chats' />} />
          <Route path='debate' element={<DebateListPage type='debates' />} />
        </Route>
        <Route path='/popup' element={<DefaultLayout back />}>
          <Route path='product/register' element={<ProductRegisterPage />} />
          <Route path='product/:id' element={<ProductDetailPage />} />
          <Route path='notifications' element={<NotificationPage />} />
          <Route path='signup' element={<SignupPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='chatroom/:id' element={<ChatroomPage />} />
        </Route>
        <Route path='/mypage' element={<DefaultLayout back />}>
          <Route path='payment-history' element={<PaymentHistory />} />
          <Route path='edit-profile' element={<EditProfilePage />} />
          <Route path='charge' element={<ChargePage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
