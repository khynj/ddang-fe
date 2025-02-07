import { Navigate, Route, Routes, useNavigate } from 'react-router'
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
  PaymentHistoryPage,
  NotificationPage,
  ChatroomListPage,
  PurchaseHistoryPage,
  SaleHistoryPage,
  FavoritesPage,
  DebateListPage,
  ChatroomPage,
  AppSettingPage,
  CustomerServicePage,
  TermsAndPoliciesPage,
  MyLocationsPage,
  SubscriptionsPage,
  NoticesPage,
  ChangePasswordPage,
  ProfilePage,
  MyLocationsRegisterPage,
  ReviewHistoryPage,
  MyProductListPage,
  ReviewRegisterPage,
} from './features'
import ExploreLayout from './layouts/ExploreLayout'
import DefaultLayout from './layouts/DefaultLayout'
import DropDownLayout from './layouts/DropDownLayout'
import MyAuctionLayout from './layouts/MyAuctionLayout'
import NotFoundPage from './pages/NotFoundPage'
import { useEffect } from 'react'
import ROUTES from './data/ROUTES'
import ReviewHistoryLayout from './layouts/ReviewHistoryLayout'

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
        <Route path={ROUTES.WELCOME} element={<WelcomePage />} />
        <Route path={ROUTES.HOME} element={<ExploreLayout />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.SEARCH} element={<SearchPage />} />
          <Route
            path={ROUTES.PRODUCT_LIST}
            element={<ProductListPage filters />}
          />
        </Route>
        <Route
          path={ROUTES.MY_PRODUCTS}
          element={
            <DropDownLayout
              routes={[
                { name: '입찰현황', to: ROUTES.MY_BIDS },
                { name: '판매현황', to: ROUTES.MY_SALES },
              ]}
            />
          }
        >
          <Route index element={<Navigate to={ROUTES.MY_BIDS} replace />} />
          <Route
            path={ROUTES.MY_BIDS}
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
            <Route index element={<MyProductListPage />} />
            <Route path='sold' element={<MyProductListPage isHammered />} />
          </Route>
          <Route
            path={ROUTES.MY_SALES}
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
            <Route index element={<MyProductListPage isSeller />} />
            <Route
              path='sold'
              element={<MyProductListPage isHammered isSeller />}
            />
            <Route path='pre' element={<MyProductListPage isSeller isPre />} />
          </Route>
        </Route>
        <Route path='/' element={<DefaultLayout />}>
          <Route path={ROUTES.MYPAGE} element={<MyPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>

        <Route
          path={ROUTES.CHAT}
          element={
            <DropDownLayout
              back
              routes={[
                { name: '채팅방', to: ROUTES.CHATROOM_LIST_PRIVATE },
                { name: '토론방', to: ROUTES.CHATROOM_LIST_GROUP },
              ]}
              feature={{
                icon: { name: 'edit', className: 'text-gray-600' },
                onClick: () => console.log('edit chatroom'),
              }}
            />
          }
        >
          <Route
            index
            element={<Navigate to={ROUTES.CHATROOM_LIST_PRIVATE} replace />}
          />
          <Route
            path={ROUTES.CHATROOM_LIST_PRIVATE}
            element={<ChatroomListPage type='chats' />}
          />
          <Route
            path={ROUTES.CHATROOM_LIST_GROUP}
            element={<DebateListPage type='debates' />}
          />
        </Route>
        <Route path='/' element={<DefaultLayout back />}>
          <Route path={ROUTES.CHATROOM} element={<ChatroomPage />} />
          <Route
            path={ROUTES.PRODUCT_REGISTER}
            element={<ProductRegisterPage />}
          />
          <Route
            path={ROUTES.PRODUCT_LIST_BY_USER}
            element={<ProductListPage />} //
          />
          <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage />} />
          <Route path={ROUTES.NOTIFICATIONS} element={<NotificationPage />} />
          <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route
            path={ROUTES.MY_LOCATIONS_REGISTER}
            element={<MyLocationsRegisterPage />}
          />
          <Route
            path={ROUTES.REVIEW_REGISTER}
            element={<ReviewRegisterPage />}
          />
        </Route>
        <Route path={ROUTES.MYPAGE} element={<DefaultLayout back />}>
          <Route
            path={ROUTES.PAYMENT_HISTORY}
            element={<PaymentHistoryPage />}
          />
          <Route path={ROUTES.EDIT_PROFILE} element={<EditProfilePage />} />
          <Route path={ROUTES.CHARGE} element={<ChargePage />} />
          <Route
            path={ROUTES.PURCHASE_HISTORY}
            element={<PurchaseHistoryPage />}
          />
          <Route path={ROUTES.SALE_HISTORY} element={<SaleHistoryPage />} />
          <Route path={ROUTES.FAVORITES} element={<FavoritesPage />}>
            <Route index element={<Navigate to={'pre'} replace />} />
            <Route path={'pre'} element={<ProductListPage />} />
            <Route path={'after'} element={<ProductListPage />} />
            <Route path={'ongoing'} element={<ProductListPage />} />
          </Route>
          <Route path={ROUTES.APP_SETTING} element={<AppSettingPage />} />
          <Route
            path={ROUTES.CHANGE_PASSWORD}
            element={<ChangePasswordPage />}
          />
          <Route
            path={ROUTES.CUSTOMER_SERVICE}
            element={<CustomerServicePage />}
          />
          <Route path={ROUTES.POLICIES} element={<TermsAndPoliciesPage />} />
          <Route path={ROUTES.SUBSCRIPTIONS} element={<SubscriptionsPage />} />
          <Route path={ROUTES.NOTICES} element={<NoticesPage />} />
          <Route
            path={ROUTES.USER_REVIEW_HISTORY}
            element={<ReviewHistoryPage />}
          />
          <Route path={ROUTES.REVIEW_HISTORY} element={<ReviewHistoryLayout />}>
            <Route index element={<Navigate to={'received'} replace />} />
            <Route path={'received'} element={<ReviewHistoryPage received />} />
            <Route path={'written'} element={<ReviewHistoryPage />} />
          </Route>
        </Route>
        <Route
          path={ROUTES.MYPAGE}
          element={
            <DefaultLayout
              back
              feature={{
                icon: {
                  name: 'add',
                  className: 'text-gray-600',
                },
                onClick: () => route(ROUTES.MY_LOCATIONS_REGISTER),
              }}
            />
          }
        >
          <Route path={ROUTES.MY_LOCATIONS} element={<MyLocationsPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
