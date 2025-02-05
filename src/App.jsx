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
  PurchaseHistory,
  SaleHistory,
  Favorites,
  DebateListPage,
  ChatroomPage,
  AppSetting,
  CustomerService,
  TermsAndPolicies,
  MyLocations,
  Subscriptions,
  Notices,
  ReviewHistory,
  ChangePassword,
} from './features'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import ExploreLayout from './layouts/ExploreLayout'
import DefaultLayout from './layouts/DefaultLayout'
import NotFoundPage from './pages/NotFoundPage'
import DropDownLayout from './layouts/DropDownLayout'
import MyAuctionLayout from './layouts/MyAuctionLayout'
import { useEffect } from 'react'

function App() {
  const route = useNavigate()
  useEffect(() => {
    initFCM()
  }, [])
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
            element={
              <MyAuctionLayout
                name='입찰현황'
                tabs={[
                  { name: '입찰중인 상품', to: '', end: true },
                  {
                    name: '낙찰된 상품',
                    to: 'sold',
                  },
                ]}
              />
            }
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
            element={
              <MyAuctionLayout
                name='판매현황'
                tabs={[
                  { name: '판매중인 상품', to: '', end: true },
                  { name: '판매 예정 상품', to: 'pre', end: true },
                  {
                    name: '낙찰된 상품',
                    to: 'sold',
                  },
                ]}
              />
            }
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
            <Route
              path='pre'
              element={
                <ProductListPage
                  filters
                  filter={product =>
                    product.startTime < new Date().toISOString()
                  }
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
          <Route path='sale-history' element={<SaleHistory />} />
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
