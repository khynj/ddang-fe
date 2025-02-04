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
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import ExploreLayout from './layouts/ExploreLayout'
import DefaultLayout from './layouts/DefaultLayout'
import NotFoundPage from './pages/NotFoundPage'
import DropDownLayout from './layouts/DropDownLayout'
import PurchaseHistory from './features/payment/pages/PurchaseHistory'
import SalesHistory from './features/payment/pages/SaleHistory'
import Favorites from './features/user/pages/Favorites'
import MyAuctionLayout from './layouts/MyAuctionLayout'
import DebateListPage from './features/chat/pages/DebateListPage'
import ChatroomPage from './features/chat/pages/ChatroomPage'
import AppSetting from './features/user/pages/AppSetting'
import CustomerService from './features/user/pages/CustomerService'
import TermsAndPolicies from './features/user/pages/TermsAndPolicies'
import MyLocations from './features/user/pages/MyLocations'
import Subscriptions from './features/user/pages/Subscriptions'
import Notices from './features/user/pages/Notices'
import ReviewHistory from './features/user/pages/ReviewHistory'
import ChangePassword from './features/user/pages/ChangePassword'

function App() {
  initFCM()
  const route = useNavigate()

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
          <Route path='search/products' element={<ProductListPage filters />} />
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
                <ProductListPage
                  filters
                  filter={product => product.myBidPrice}
                />
              }
            />
            <Route
              path='sold'
              element={
                <ProductListPage
                  filters
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
                <ProductListPage
                  filters
                  filter={product => product.myBidPrice}
                />
              }
            />
            <Route
              path='sold'
              element={
                <ProductListPage
                  filters
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
          <Route path='purchase-history' element={<PurchaseHistory />} />
          <Route path='sale-history' element={<SalesHistory />} />
          <Route path='favorites' element={<Favorites />}>
            <Route path='pre' element={<ProductListPage />} />
            <Route path='after' element={<ProductListPage />} />
            <Route path='ongoing' element={<ProductListPage />} />
          </Route>
          <Route path='app-setting' element={<AppSetting />} />
          <Route
            path='app-setting/change-password'
            element={<ChangePassword />}
          />
          <Route path='customer-service' element={<CustomerService />} />
          <Route path='policies' element={<TermsAndPolicies />} />
          <Route path='subscriptions' element={<Subscriptions />} />
          <Route path='notices' element={<Notices />} />
          <Route path='review-history' element={<ReviewHistory />}>
            <Route path='received' element={<ProductListPage />} />
            <Route path='written' element={<ProductListPage />} />
          </Route>
        </Route>
        <Route
          path='/mypage'
          element={
            <DefaultLayout
              back
              feature={{
                icon: {
                  name: 'add',
                  className: 'text-gray-600',
                },
                onClick: () => route('/mypage/my-locations/register'),
              }}
            />
          }
        >
          <Route path='my-locations' element={<MyLocations />} />
          {/* <Route path='my-locations/register' element={< />} /> */}
        </Route>
      </Routes>
    </div>
  )
}

export default App
